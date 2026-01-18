import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Country, State, City } from "country-state-city";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiUrl, adminRequest } from "@/lib/api";
import {
  getAllClientIds,
  getClientImages,
  getClientName,
} from "@/lib/clients-data";
import { getAllLocations, getLocationData } from "@/lib/locations-data";
import type { Location, Project, ProjectImage } from "@/lib/types";

type AdminProjectForm = {
  name: string;
  coverImageUrl: string;
};

const emptyProjectForm: AdminProjectForm = {
  name: "",
  coverImageUrl: "",
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const titleCase = (value: string) =>
  value
    .split("-")
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(" ");

const getLocationIdFromClient = (clientId: string) => {
  const parts = clientId.split("-");
  if (parts.length < 2) {
    return clientId;
  }
  return parts.slice(0, -1).join("-");
};

export default function Admin() {
  const queryClient = useQueryClient();
  const [adminPassword, setAdminPassword] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem("vajramAdminPassword");
    if (saved) {
      setAdminPassword(saved);
    }
  }, []);

  const locationsQuery = useQuery<Location[]>({
    queryKey: [apiUrl("/api/locations")],
  });
  const projectsQuery = useQuery<Project[]>({
    queryKey: [apiUrl("/api/projects")],
  });

  const fallbackLocations = useMemo<Location[]>(() => {
    return getAllLocations().map((locationId) => {
      const locationName = titleCase(locationId);
      const locationData = getLocationData(locationName);
      return {
        id: locationId,
        name: locationData.name,
        stateOrCountry: locationData.stateOrCountry,
      };
    });
  }, []);

  const fallbackProjects = useMemo<Project[]>(() => {
    const seenLocations = new Set<string>();
    return getAllClientIds().reduce<Project[]>((acc, clientId) => {
      const locationId = getLocationIdFromClient(clientId);
      if (seenLocations.has(locationId)) {
        return acc;
      }
      seenLocations.add(locationId);
      const images = getClientImages(clientId).map((image, index) => ({
        id: `${clientId}-${index}`,
        url: image.url,
        label: image.label,
      }));
      acc.push({
        id: clientId,
        name: getClientName(clientId),
        locationId,
        coverImageUrl: images[0]?.url || "",
        images,
      });
      return acc;
    }, []);
  }, []);

  const locations = locationsQuery.data?.length
    ? locationsQuery.data
    : fallbackLocations;
  const projects = projectsQuery.data?.length
    ? projectsQuery.data
    : fallbackProjects;

  const countries = useMemo(() => Country.getAllCountries(), []);
  const [newProjectForm, setNewProjectForm] =
    useState<AdminProjectForm>(emptyProjectForm);
  const [editProjectForm, setEditProjectForm] =
    useState<AdminProjectForm>(emptyProjectForm);
  const [newProjectCountryIso, setNewProjectCountryIso] = useState("");
  const [newProjectStateIso, setNewProjectStateIso] = useState("");
  const [newProjectCity, setNewProjectCity] = useState("");
  const [newProjectLabel, setNewProjectLabel] = useState<"Interior" | "Exterior">(
    "Exterior"
  );
  const [newProjectFiles, setNewProjectFiles] = useState<File[]>([]);
  const [editProjectCountryIso, setEditProjectCountryIso] = useState("");
  const [editProjectStateIso, setEditProjectStateIso] = useState("");
  const [editProjectCity, setEditProjectCity] = useState("");
  const [activeProjectId, setActiveProjectId] = useState("");
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [uploadLabels, setUploadLabels] = useState<string[]>([]);
  const [uploadLabel, setUploadLabel] = useState<"Interior" | "Exterior">(
    "Exterior"
  );
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId),
    [projects, activeProjectId]
  );

  const locationById = useMemo(() => {
    return new Map(locations.map((location) => [location.id, location]));
  }, [locations]);

  const stateOptions = useMemo(() => {
    const states = new Set<string>();
    locations.forEach((location) => {
      states.add(location.stateOrCountry || "Unknown");
    });
    return Array.from(states).sort();
  }, [locations]);

  const cityOptions = useMemo(() => {
    return locations
      .filter((location) =>
        selectedState ? location.stateOrCountry === selectedState : true
      )
      .map((location) => location.name)
      .sort();
  }, [locations, selectedState]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const location = locationById.get(project.locationId);
      const state = location?.stateOrCountry || "Unknown";
      const city = location?.name || project.locationId;
      if (selectedState && state !== selectedState) {
        return false;
      }
      if (selectedCity && city !== selectedCity) {
        return false;
      }
      return true;
    });
  }, [projects, locationById, selectedState, selectedCity]);

  useEffect(() => {
    if (selectedState && selectedCity) {
      const cityExists = cityOptions.includes(selectedCity);
      if (!cityExists) {
        setSelectedCity("");
      }
    }
  }, [cityOptions, selectedCity, selectedState]);

  useEffect(() => {
    if (!countries.length) {
      return;
    }
    if (!newProjectCountryIso) {
      setNewProjectStateIso("");
      setNewProjectCity("");
    }
  }, [countries, newProjectCountryIso]);

  const newProjectStates = useMemo(
    () => State.getStatesOfCountry(newProjectCountryIso),
    [newProjectCountryIso]
  );
  const newProjectCities = useMemo(() => {
    if (!newProjectCountryIso) {
      return [];
    }
    if (newProjectStateIso) {
      return (
        City.getCitiesOfState(newProjectCountryIso, newProjectStateIso) || []
      );
    }
    return City.getCitiesOfCountry(newProjectCountryIso) || [];
  }, [newProjectCountryIso, newProjectStateIso]);

  const editProjectStates = useMemo(
    () => State.getStatesOfCountry(editProjectCountryIso),
    [editProjectCountryIso]
  );
  const editProjectCities = useMemo(() => {
    if (!editProjectCountryIso) {
      return [];
    }
    if (editProjectStateIso) {
      return (
        City.getCitiesOfState(editProjectCountryIso, editProjectStateIso) || []
      );
    }
    return City.getCitiesOfCountry(editProjectCountryIso) || [];
  }, [editProjectCountryIso, editProjectStateIso]);

  const getCountryName = (isoCode: string) =>
    countries.find((country) => country.isoCode === isoCode)?.name || "";

  const getStateName = (states: ReturnType<typeof State.getStatesOfCountry>, iso: string) =>
    states.find((state) => state.isoCode === iso)?.name || "";

  useEffect(() => {
    if (!editProjectStateIso && editProjectStates.length > 0) {
      setEditProjectStateIso(editProjectStates[0].isoCode);
    }
  }, [editProjectStateIso, editProjectStates]);

  useEffect(() => {
    if (!newProjectCountryIso) {
      setNewProjectStateIso("");
      setNewProjectCity("");
    }
  }, [newProjectCountryIso]);

  useEffect(() => {
    if (!editProjectCity && editProjectCities.length > 0) {
      setEditProjectCity(editProjectCities[0].name);
    }
  }, [editProjectCity, editProjectCities]);

  const resolveLocationSelection = (
    location: Location | undefined,
    setCountryIso: (value: string) => void,
    setStateIso: (value: string) => void,
    setCityName: (value: string) => void
  ) => {
    if (!location || !countries.length) {
      return;
    }
    const stateOrCountry = location.stateOrCountry || "";
    const directCountry = countries.find(
      (country) => country.name === stateOrCountry
    );
    if (directCountry) {
      setCountryIso(directCountry.isoCode);
      const states = State.getStatesOfCountry(directCountry.isoCode);
      const matchState = states.find((state) =>
        City.getCitiesOfState(directCountry.isoCode, state.isoCode).some(
          (city) => city.name === location.name
        )
      );
      setStateIso(matchState?.isoCode || "");
      setCityName(location.name);
      return;
    }

    for (const country of countries) {
      const states = State.getStatesOfCountry(country.isoCode);
      const matchState = states.find(
        (state) => state.name === stateOrCountry
      );
      if (matchState) {
        setCountryIso(country.isoCode);
        setStateIso(matchState.isoCode);
        setCityName(location.name);
        return;
      }
    }
  };

  useEffect(() => {
    if (!activeProject) {
      setEditProjectForm(emptyProjectForm);
      return;
    }
    setEditProjectForm({
      name: activeProject.name || "",
      coverImageUrl: activeProject.coverImageUrl || "",
    });
    const activeLocation = locations.find(
      (location) => location.id === activeProject.locationId
    );
    resolveLocationSelection(
      activeLocation,
      setEditProjectCountryIso,
      setEditProjectStateIso,
      setEditProjectCity
    );
  }, [activeProject, countries, locations]);

  const handleSavePassword = () => {
    const trimmed = passwordInput.trim();
    if (!trimmed) {
      return;
    }
    sessionStorage.setItem("vajramAdminPassword", trimmed);
    setAdminPassword(trimmed);
    setPasswordInput("");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("vajramAdminPassword");
    setAdminPassword("");
    setPasswordInput("");
  };

  const ensureLocationExists = async (
    locationName: string,
    stateOrCountry: string
  ) => {
    const locationId = slugify(locationName);
    if (locations.some((location) => location.id === locationId)) {
      return locationId;
    }
    await adminRequest<Location>(
      "/api/locations",
      adminPassword,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: locationName,
          stateOrCountry,
        }),
      }
    );
    return locationId;
  };

  const createProjectMutation = useMutation({
    mutationFn: async () => {
      const countryName = getCountryName(newProjectCountryIso);
      const stateName = getStateName(newProjectStates, newProjectStateIso);
      const locationId = await ensureLocationExists(
        newProjectCity,
        stateName || countryName
      );
      const created = await adminRequest<Project>(
        "/api/projects",
        adminPassword,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: newProjectForm.name,
            locationId,
          }),
        }
      );
      if (created && newProjectFiles.length > 0) {
        const formData = new FormData();
        newProjectFiles.forEach((file) => formData.append("images", file));
        formData.append(
          "labels",
          JSON.stringify(newProjectFiles.map(() => newProjectLabel))
        );
        await adminRequest<Project>(
          `/api/projects/${created.id}/images`,
          adminPassword,
          {
            method: "POST",
            body: formData,
          }
        );
      }
      return created;
    },
    onSuccess: () => {
      setNewProjectForm(emptyProjectForm);
      setNewProjectFiles([]);
      setNewProjectLabel("Exterior");
      queryClient.invalidateQueries({ queryKey: [apiUrl("/api/projects")] });
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: async () => {
      if (!activeProjectId) {
        return null;
      }
      const countryName = getCountryName(editProjectCountryIso);
      const stateName = getStateName(editProjectStates, editProjectStateIso);
      const locationId = await ensureLocationExists(
        editProjectCity,
        stateName || countryName
      );
      return adminRequest<Project>(
        `/api/projects/${activeProjectId}`,
        adminPassword,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: editProjectForm.name,
            locationId,
            coverImageUrl: editProjectForm.coverImageUrl || "",
          }),
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [apiUrl("/api/projects")] });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (projectId: string) => {
      return adminRequest(
        `/api/projects/${projectId}`,
        adminPassword,
        { method: "DELETE" }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [apiUrl("/api/projects")] });
    },
  });

  const uploadImagesMutation = useMutation({
    mutationFn: async () => {
      if (!activeProjectId || uploadFiles.length === 0) {
        return null;
      }
      const formData = new FormData();
      uploadFiles.forEach((file) => formData.append("images", file));
      formData.append("labels", JSON.stringify(uploadLabels));
      return adminRequest<Project>(
        `/api/projects/${activeProjectId}/images`,
        adminPassword,
        {
          method: "POST",
          body: formData,
        }
      );
    },
    onSuccess: () => {
      setUploadFiles([]);
      setUploadLabels([]);
      queryClient.invalidateQueries({ queryKey: [apiUrl("/api/projects")] });
    },
  });

  const deleteImageMutation = useMutation({
    mutationFn: async (payload: { projectId: string; imageId: string }) => {
      return adminRequest(
        `/api/projects/${payload.projectId}/images/${payload.imageId}?deleteCloudinary=true`,
        adminPassword,
        { method: "DELETE" }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [apiUrl("/api/projects")] });
    },
  });

  const handleFilesChange = (files: File[]) => {
    setUploadFiles(files);
    setUploadLabels(files.map(() => uploadLabel));
  };

  useEffect(() => {
    if (uploadFiles.length > 0) {
      setUploadLabels(uploadFiles.map(() => uploadLabel));
    }
  }, [uploadFiles, uploadLabel]);

  const handleNewProjectFilesChange = (files: File[]) => {
    setNewProjectFiles(files);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <main
        className={
          adminPassword
            ? "container mx-auto px-3 sm:px-4 py-10 sm:py-12"
            : "container mx-auto px-3 sm:px-4 min-h-screen flex items-center justify-center py-10 sm:py-12"
        }
      >
        <div className={adminPassword ? "" : "w-full max-w-xl text-center"}>
          <h1
            className={
              adminPassword
                ? "text-3xl sm:text-4xl font-bold font-serif mb-8"
                : "text-3xl sm:text-4xl font-bold font-serif mb-6"
            }
          >
            Admin Panel
          </h1>

          {!adminPassword ? (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 sm:p-8">
              <h2 className="text-lg font-semibold mb-4">Admin Login</h2>
              <div className="flex flex-col gap-4">
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="cursor-pointer"
                />
                <Button
                  onClick={handleSavePassword}
                  className="uppercase tracking-widest text-xs cursor-pointer"
                >
                  Unlock Admin
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-10">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-sm text-gray-400">
                Admin mode active
              </span>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="uppercase tracking-widest text-xs cursor-pointer"
              >
                Log out
              </Button>
            </div>

            <section className="bg-gray-900 border border-gray-800 rounded-lg p-6 space-y-10">
              <div>
                <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
                <div className="grid gap-4 md:grid-cols-6 mb-4">
                  <Input
                    placeholder="Client name"
                    value={newProjectForm.name}
                    onChange={(e) =>
                      setNewProjectForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="cursor-pointer"
                  />
                  <Select
                    value={newProjectCountryIso}
                    onValueChange={(iso) => {
                      setNewProjectCountryIso(iso);
                      setNewProjectStateIso("");
                      setNewProjectCity("");
                    }}
                  >
                    <SelectTrigger className="bg-gray-950 border border-gray-800 text-sm cursor-pointer">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent
                      side="bottom"
                      avoidCollisions={false}
                      className="admin-select-scroll max-h-60 overflow-y-auto"
                    >
                      {countries.map((country) => (
                        <SelectItem
                          key={country.isoCode}
                          value={country.isoCode}
                        >
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={newProjectStateIso}
                    onValueChange={(iso) => {
                      setNewProjectStateIso(iso);
                      setNewProjectCity("");
                    }}
                  >
                    <SelectTrigger className="bg-gray-950 border border-gray-800 text-sm cursor-pointer">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent
                      side="bottom"
                      avoidCollisions={false}
                      className="admin-select-scroll max-h-60 overflow-y-auto"
                    >
                      {newProjectStates.map((state) => (
                        <SelectItem key={state.isoCode} value={state.isoCode}>
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={newProjectCity}
                    onValueChange={(value) => setNewProjectCity(value)}
                  >
                    <SelectTrigger className="bg-gray-950 border border-gray-800 text-sm cursor-pointer">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent
                      side="bottom"
                      avoidCollisions={false}
                      className="admin-select-scroll max-h-60 overflow-y-auto"
                    >
                      {newProjectCities.map((city) => (
                        <SelectItem key={city.name} value={city.name}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="md:col-span-6 grid gap-4 md:grid-cols-4 items-center">
                    <Select
                      value={newProjectLabel}
                      onValueChange={(value) =>
                        setNewProjectLabel(value as "Interior" | "Exterior")
                      }
                    >
                    <SelectTrigger className="bg-gray-950 border border-gray-800 text-sm cursor-pointer">
                        <SelectValue placeholder="Image type" />
                      </SelectTrigger>
                      <SelectContent
                        side="bottom"
                        avoidCollisions={false}
                        className="admin-select-scroll max-h-60 overflow-y-auto"
                      >
                        <SelectItem value="Exterior">Exterior</SelectItem>
                        <SelectItem value="Interior">Interior</SelectItem>
                      </SelectContent>
                    </Select>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) =>
                        handleNewProjectFilesChange(
                          Array.from(e.target.files || [])
                        )
                      }
                      className="text-sm text-gray-300 md:col-span-2 border border-gray-700 rounded-md px-3 py-2 cursor-pointer"
                    />
                    <Button
                      onClick={() => createProjectMutation.mutate()}
                      disabled={
                        !newProjectForm.name ||
                        !newProjectCity ||
                        newProjectFiles.length === 0
                      }
                      className="uppercase tracking-widest text-xs cursor-pointer"
                    >
                      Add Project
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Existing Projects</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Button
                    variant={selectedState ? "outline" : "default"}
                    onClick={() => {
                      setSelectedState("");
                      setSelectedCity("");
                    }}
                    className="uppercase tracking-widest text-[10px] cursor-pointer"
                  >
                    All States
                  </Button>
                  {stateOptions.map((state) => (
                    <Button
                      key={state}
                      variant={selectedState === state ? "default" : "outline"}
                      onClick={() => {
                        setSelectedState(state);
                        setSelectedCity("");
                      }}
                      className="uppercase tracking-widest text-[10px] cursor-pointer"
                    >
                      {state}
                    </Button>
                  ))}
                </div>
                {selectedState && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Button
                      variant={selectedCity ? "outline" : "default"}
                      onClick={() => setSelectedCity("")}
                      className="uppercase tracking-widest text-[10px] cursor-pointer"
                    >
                      All Cities
                    </Button>
                    {cityOptions.map((city) => (
                      <Button
                        key={city}
                        variant={selectedCity === city ? "default" : "outline"}
                        onClick={() => setSelectedCity(city)}
                        className="uppercase tracking-widest text-[10px] cursor-pointer"
                      >
                        {city}
                      </Button>
                    ))}
                  </div>
                )}
                <div className="space-y-2">
                  {filteredProjects.map((project) => {
                    const location = locationById.get(project.locationId);
                    const state = location?.stateOrCountry || "Unknown";
                    const city = location?.name || project.locationId;
                    return (
                      <div
                        key={project.id}
                        className="flex flex-wrap items-center justify-between gap-3 bg-gray-950 border border-gray-800 rounded-md px-4 py-3"
                      >
                        <div>
                          <p className="font-medium">{project.name}</p>
                          <p className="text-xs text-gray-400">
                            {city} · {state} · {project.images?.length || 0} images
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            variant="outline"
                            onClick={() => setActiveProjectId(project.id)}
                            className="uppercase tracking-widest text-[10px] cursor-pointer"
                          >
                            Manage
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() =>
                              deleteProjectMutation.mutate(project.id)
                            }
                            className="uppercase tracking-widest text-[10px] cursor-pointer"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {activeProject && (
                <>
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      Edit Project
                    </h2>
                    <div className="grid gap-4 md:grid-cols-6">
                      <Input
                        placeholder="Client name"
                        value={editProjectForm.name}
                        onChange={(e) =>
                          setEditProjectForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="cursor-pointer"
                      />
                      <Select
                        value={editProjectCountryIso}
                        onValueChange={(iso) => {
                          setEditProjectCountryIso(iso);
                          setEditProjectStateIso("");
                          setEditProjectCity("");
                        }}
                      >
                        <SelectTrigger className="bg-gray-950 border border-gray-800 text-sm cursor-pointer">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent
                          side="bottom"
                          avoidCollisions={false}
                          className="admin-select-scroll max-h-60 overflow-y-auto"
                        >
                          {countries.map((country) => (
                            <SelectItem
                              key={country.isoCode}
                              value={country.isoCode}
                            >
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={editProjectStateIso}
                        onValueChange={(iso) => {
                          setEditProjectStateIso(iso);
                          setEditProjectCity("");
                        }}
                      >
                        <SelectTrigger className="bg-gray-950 border border-gray-800 text-sm cursor-pointer">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent
                          side="bottom"
                          avoidCollisions={false}
                          className="admin-select-scroll max-h-60 overflow-y-auto"
                        >
                          {editProjectStates.map((state) => (
                            <SelectItem key={state.isoCode} value={state.isoCode}>
                              {state.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={editProjectCity}
                        onValueChange={(value) => setEditProjectCity(value)}
                      >
                        <SelectTrigger className="bg-gray-950 border border-gray-800 text-sm cursor-pointer">
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent
                          side="bottom"
                          avoidCollisions={false}
                          className="admin-select-scroll max-h-60 overflow-y-auto"
                        >
                          {editProjectCities.map((city) => (
                            <SelectItem key={city.name} value={city.name}>
                              {city.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Cover image URL"
                        value={editProjectForm.coverImageUrl}
                        onChange={(e) =>
                          setEditProjectForm((prev) => ({
                            ...prev,
                            coverImageUrl: e.target.value,
                          }))
                        }
                        className="cursor-pointer"
                      />
                      <Button
                        onClick={() => updateProjectMutation.mutate()}
                        className="uppercase tracking-widest text-xs md:col-span-6 cursor-pointer"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      Upload Images
                    </h2>
                    <div className="grid gap-4 md:grid-cols-4 items-center">
                      <Select
                        value={uploadLabel}
                        onValueChange={(value) =>
                          setUploadLabel(value as "Interior" | "Exterior")
                        }
                      >
                      <SelectTrigger className="bg-gray-950 border border-gray-800 text-sm cursor-pointer">
                          <SelectValue placeholder="Image type" />
                        </SelectTrigger>
                        <SelectContent
                          side="bottom"
                          avoidCollisions={false}
                          className="admin-select-scroll max-h-60 overflow-y-auto"
                        >
                          <SelectItem value="Exterior">Exterior</SelectItem>
                          <SelectItem value="Interior">Interior</SelectItem>
                        </SelectContent>
                      </Select>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) =>
                          handleFilesChange(
                            Array.from(e.target.files || [])
                          )
                        }
                        className="text-sm text-gray-300 md:col-span-2 border border-gray-700 rounded-md px-3 py-2 cursor-pointer"
                      />
                      <Button
                        onClick={() => uploadImagesMutation.mutate()}
                        disabled={!uploadFiles.length}
                        className="uppercase tracking-widest text-xs cursor-pointer"
                      >
                        Upload Images
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      Manage Images
                    </h2>
                    <div className="space-y-3">
                      {(activeProject.images || []).map((image: ProjectImage) => (
                        <div
                          key={image.id}
                          className="flex flex-wrap items-center justify-between gap-3 bg-gray-950 border border-gray-800 rounded-md px-4 py-3"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={image.url}
                              alt={image.label}
                              className="h-12 w-16 object-cover rounded-md"
                            />
                            <div>
                              <p className="text-sm">{image.label}</p>
                              <p className="text-xs text-gray-500">
                                {image.url.slice(-24)}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            onClick={() =>
                              deleteImageMutation.mutate({
                                projectId: activeProject.id,
                                imageId: image.id,
                              })
                            }
                            className="uppercase tracking-widest text-[10px] cursor-pointer"
                          >
                            Delete
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
