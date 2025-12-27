// Cloudinary Image URLs
// All images are now loaded from Cloudinary for faster performance

// Client data organized by location
// Structure: { location: { clientNumber: { images: string[], name: string } } }
// Each location has clients numbered starting from 1
// Client IDs format: "location-clientNumber" (e.g., "guntur-1", "hyderabad-1")

type ClientData = {
  images: string[];
  name: string;
};

type LocationClients = Record<string, ClientData>;

const clientDataByLocation: Record<string, LocationClients> = {
  // Guntur Location
  guntur: {
    "1": {
      images: [
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121561/OP_9_47_-_Photo_wset30.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121561/OP_9_46_-_Photo_of1u8e.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121561/OP_9_49_-_Photo_bz4vuq.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121561/OP_9_50_-_Photo_vjc25g.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121602/Mrs.Sujatha_Interiors_41_-_Photo_caxwja.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121601/gurst_room_5_-_Photo_aysigq.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121600/teja_bedroom_2_-_Photo_bliken.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121601/teja_bedroom_4_-_Photo_loxcdo.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121601/teja_bedroom_6_-_Photo_objwom.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121602/gurst_room_1_-_Photo_o2weu3.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121602/Mrs.Sujatha_Master_Bed_room_Interiors_5_-_Photo_fyuqgv.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121602/Mrs.Sujatha_Interiors_41_-_Photo_caxwja.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121603/Mrs.Sujatha_Interiors_44_-_Photo_sorh4n.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121604/Mrs.Sujatha_Interiors_8_-_Photo_eyfizw.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121604/Mrs.Sujatha_Master_Bed_room_Interiors_7_-_Photo_xfcpii.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121606/Mrs.Sujatha_Interiors_13_-_Photo_ec4lx2.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121606/Mrs.Sujatha_Interiors_16_-_Photo_sx0vbf.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121606/Mrs.Sujatha_Interiors_25_-_Photo_ctbmin.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121607/Mrs.Sujatha_Interiors_10_-_Photo_jnecri.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121608/Mrs.Sujatha_Interiors_18_-_Photo_qwchgv.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121610/Mrs.Sujatha_Interiors_6_-_Photo_amtcgs.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121610/Mrs.Sujatha_Interiors_11_-_Photo_l8imcb.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121610/Mrs.Sujatha_Interiors_39_-_Photo_ffstb9.jpg",
      ],
      name: "Mr. Bathula Srinivas"
    },
    "2": {
      images: [
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121561/OP_9_47_-_Photo_wset30.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121561/OP_9_46_-_Photo_of1u8e.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121561/OP_9_49_-_Photo_bz4vuq.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121561/OP_9_50_-_Photo_vjc25g.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121602/Mrs.Sujatha_Interiors_41_-_Photo_caxwja.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121601/gurst_room_5_-_Photo_aysigq.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121600/teja_bedroom_2_-_Photo_bliken.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121601/teja_bedroom_4_-_Photo_loxcdo.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121601/teja_bedroom_6_-_Photo_objwom.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121602/gurst_room_1_-_Photo_o2weu3.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121602/Mrs.Sujatha_Master_Bed_room_Interiors_5_-_Photo_fyuqgv.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121602/Mrs.Sujatha_Interiors_41_-_Photo_caxwja.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121603/Mrs.Sujatha_Interiors_44_-_Photo_sorh4n.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121604/Mrs.Sujatha_Interiors_8_-_Photo_eyfizw.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121604/Mrs.Sujatha_Master_Bed_room_Interiors_7_-_Photo_xfcpii.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121606/Mrs.Sujatha_Interiors_13_-_Photo_ec4lx2.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121606/Mrs.Sujatha_Interiors_16_-_Photo_sx0vbf.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121606/Mrs.Sujatha_Interiors_25_-_Photo_ctbmin.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121607/Mrs.Sujatha_Interiors_10_-_Photo_jnecri.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121608/Mrs.Sujatha_Interiors_18_-_Photo_qwchgv.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121610/Mrs.Sujatha_Interiors_6_-_Photo_amtcgs.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121610/Mrs.Sujatha_Interiors_11_-_Photo_l8imcb.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121610/Mrs.Sujatha_Interiors_39_-_Photo_ffstb9.jpg",
      ],
      name: "Mr. Bathula Srinivas"
    },
    "3": {
      images: [
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121561/OP_9_47_-_Photo_wset30.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121561/OP_9_46_-_Photo_of1u8e.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121561/OP_9_49_-_Photo_bz4vuq.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121561/OP_9_50_-_Photo_vjc25g.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121602/Mrs.Sujatha_Interiors_41_-_Photo_caxwja.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121601/gurst_room_5_-_Photo_aysigq.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121600/teja_bedroom_2_-_Photo_bliken.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121601/teja_bedroom_4_-_Photo_loxcdo.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121601/teja_bedroom_6_-_Photo_objwom.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121602/gurst_room_1_-_Photo_o2weu3.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121602/Mrs.Sujatha_Master_Bed_room_Interiors_5_-_Photo_fyuqgv.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121602/Mrs.Sujatha_Interiors_41_-_Photo_caxwja.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121603/Mrs.Sujatha_Interiors_44_-_Photo_sorh4n.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121604/Mrs.Sujatha_Interiors_8_-_Photo_eyfizw.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121604/Mrs.Sujatha_Master_Bed_room_Interiors_7_-_Photo_xfcpii.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121606/Mrs.Sujatha_Interiors_13_-_Photo_ec4lx2.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121606/Mrs.Sujatha_Interiors_16_-_Photo_sx0vbf.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121606/Mrs.Sujatha_Interiors_25_-_Photo_ctbmin.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121607/Mrs.Sujatha_Interiors_10_-_Photo_jnecri.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121608/Mrs.Sujatha_Interiors_18_-_Photo_qwchgv.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121610/Mrs.Sujatha_Interiors_6_-_Photo_amtcgs.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121610/Mrs.Sujatha_Interiors_11_-_Photo_l8imcb.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121610/Mrs.Sujatha_Interiors_39_-_Photo_ffstb9.jpg",
      ],
      name: "Mr. Bathula Srinivas"
    },
  },

  // Hyderabad Location
  hyderabad: {
    "1": {
      images: [
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121714/Mr_Rohith_Elevation_1_-_Photo_xsjfiw.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121715/Mr_Rohith_Elevation_5_-_Photo_mhkytx.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121716/Mr_Rohith_Elevation_9_-_Photo_nszdg6.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121717/Mr_Rohith_Elevation_11_-_Photo_dvapcb.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121711/Mr.Rohith_living_Interiors_30_-_Photo_bcprjt.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121718/Mr.Rohith_living_Interiors_13_-_Photo_nvjeju.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121709/Mr.Rohith_living_Interiors_2_-_Photo_fwtzey.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121710/Mr.Rohith_living_Interiors_3_-_Photo_kvbtod.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121710/Mr.Rohith_living_Interiors_23_-_Photo_cu6z4r.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121713/Mr.rohith_master_bedroom_6_-_Photo_nowtt7.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121713/Mr.rohith_master_bedroom_4_-_Photo_u1yqu1.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121708/Mr.Rohith_living_Interiors_1_-_Photo_cialgs.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121708/Mr.rohith_master_bedroom_2_-_Photo_shnl5s.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121707/Mr.Rohith__Children_bedroom_interiors_3_-_Photo_lzezpx.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121699/Mr.Rohith__Children_bedroom_interiors_1_-_Photo_le8qce.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121699/Mr.Rohith__Children_bedroom_interiors_2_-_Photo_gzxoiy.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121698/1_2_-_Photo_ajwwvg.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121698/1_4_-_Photo_ml7i5l.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121698/1_1_-_Photo_sy7p9r.jpg",
      ],
      name: "Mr. Rohith"
    },
    "2": {
      images: [
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121714/Mr_Rohith_Elevation_1_-_Photo_xsjfiw.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121715/Mr_Rohith_Elevation_5_-_Photo_mhkytx.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121716/Mr_Rohith_Elevation_9_-_Photo_nszdg6.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121717/Mr_Rohith_Elevation_11_-_Photo_dvapcb.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121711/Mr.Rohith_living_Interiors_30_-_Photo_bcprjt.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121718/Mr.Rohith_living_Interiors_13_-_Photo_nvjeju.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121709/Mr.Rohith_living_Interiors_2_-_Photo_fwtzey.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121710/Mr.Rohith_living_Interiors_3_-_Photo_kvbtod.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121710/Mr.Rohith_living_Interiors_23_-_Photo_cu6z4r.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121713/Mr.rohith_master_bedroom_6_-_Photo_nowtt7.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121713/Mr.rohith_master_bedroom_4_-_Photo_u1yqu1.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121708/Mr.Rohith_living_Interiors_1_-_Photo_cialgs.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121708/Mr.rohith_master_bedroom_2_-_Photo_shnl5s.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121707/Mr.Rohith__Children_bedroom_interiors_3_-_Photo_lzezpx.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121699/Mr.Rohith__Children_bedroom_interiors_1_-_Photo_le8qce.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121699/Mr.Rohith__Children_bedroom_interiors_2_-_Photo_gzxoiy.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121698/1_2_-_Photo_ajwwvg.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121698/1_4_-_Photo_ml7i5l.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121698/1_1_-_Photo_sy7p9r.jpg",
      ],
      name: "Mr. Rohith"
    },
    "3": {
      images: [
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121714/Mr_Rohith_Elevation_1_-_Photo_xsjfiw.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121715/Mr_Rohith_Elevation_5_-_Photo_mhkytx.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121716/Mr_Rohith_Elevation_9_-_Photo_nszdg6.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121717/Mr_Rohith_Elevation_11_-_Photo_dvapcb.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121711/Mr.Rohith_living_Interiors_30_-_Photo_bcprjt.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121718/Mr.Rohith_living_Interiors_13_-_Photo_nvjeju.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121709/Mr.Rohith_living_Interiors_2_-_Photo_fwtzey.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121710/Mr.Rohith_living_Interiors_3_-_Photo_kvbtod.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121710/Mr.Rohith_living_Interiors_23_-_Photo_cu6z4r.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121713/Mr.rohith_master_bedroom_6_-_Photo_nowtt7.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121713/Mr.rohith_master_bedroom_4_-_Photo_u1yqu1.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121708/Mr.Rohith_living_Interiors_1_-_Photo_cialgs.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121708/Mr.rohith_master_bedroom_2_-_Photo_shnl5s.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121707/Mr.Rohith__Children_bedroom_interiors_3_-_Photo_lzezpx.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121699/Mr.Rohith__Children_bedroom_interiors_1_-_Photo_le8qce.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121699/Mr.Rohith__Children_bedroom_interiors_2_-_Photo_gzxoiy.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121698/1_2_-_Photo_ajwwvg.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121698/1_4_-_Photo_ml7i5l.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121698/1_1_-_Photo_sy7p9r.jpg",
      ],
      name: "Mr. Rohith"
    },
  },

  // Siddipet Location
  siddipet: {
    "1": {
      images: [
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121766/1_4_-_Photo_pmqbii.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121766/1_1_-_Photo_uwk2qo.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121764/1_14_-_Photo_uivd4r.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121768/1_24_-_Photo_2_uh91ny.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121794/1_30_-_Photo_odbbts.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121795/1_19_-_Photo_xq4d8x.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121791/1_6_-_Photo_crhl04.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121790/1_24_-_Photo_a1wthp.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121788/1_13_-_Photo_npwawo.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121787/1_11_-_Photo_h7xjus.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121785/1_8_-_Photo_z3avzf.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121784/1_4_-_Photo_uwf4fi.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121784/1_1_-_Photo_aftzdx.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121765/1_28_-_Photo_ojqh45.jpg",
      ],
      name: "Mr. Doddeni Srinivasa Reddy"
    },
    "2": {
      images: [
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121766/1_4_-_Photo_pmqbii.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121766/1_1_-_Photo_uwk2qo.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121764/1_14_-_Photo_uivd4r.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121768/1_24_-_Photo_2_uh91ny.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121794/1_30_-_Photo_odbbts.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121795/1_19_-_Photo_xq4d8x.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121791/1_6_-_Photo_crhl04.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121790/1_24_-_Photo_a1wthp.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121788/1_13_-_Photo_npwawo.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121787/1_11_-_Photo_h7xjus.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121785/1_8_-_Photo_z3avzf.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121784/1_4_-_Photo_uwf4fi.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121784/1_1_-_Photo_aftzdx.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121765/1_28_-_Photo_ojqh45.jpg",
      ],
      name: "Mr. Doddeni Srinivasa Reddy"
    },
    "3": {
      images: [
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121766/1_4_-_Photo_pmqbii.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121766/1_1_-_Photo_uwk2qo.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121764/1_14_-_Photo_uivd4r.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121768/1_24_-_Photo_2_uh91ny.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121794/1_30_-_Photo_odbbts.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121795/1_19_-_Photo_xq4d8x.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121791/1_6_-_Photo_crhl04.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121790/1_24_-_Photo_a1wthp.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121788/1_13_-_Photo_npwawo.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121787/1_11_-_Photo_h7xjus.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121785/1_8_-_Photo_z3avzf.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121784/1_4_-_Photo_uwf4fi.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121784/1_1_-_Photo_aftzdx.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121765/1_28_-_Photo_ojqh45.jpg",
      ],
      name: "Mr. Doddeni Srinivasa Reddy"
    },
  },

  // Suryapet Location
  suryapet: {
    "1": {
      images: [
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121935/Mr.Zahir_Elevation_OP4_16_-_Photo_rrmm5i.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121922/Mr.Zahir_Elevation_OP4_6_-_Photo_ow7oy0.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121937/Mr.Zahir_Elevation_OP4_3_-_Photo_nxoyzf.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121923/Mr.Zahir_Elevation_OP4_12_-_Photo_zxg6ne.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121925/Mr.Zahir_Elevation_OP4_13_-_Photo_kwj4j0.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121938/Mr.Zahir_Elevation_OP4_16_-_Photo_2_cemyge.jpg",
      ],
      name: "Mr. Zahir"
    },
    "2": {
      images: [
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121935/Mr.Zahir_Elevation_OP4_16_-_Photo_rrmm5i.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121922/Mr.Zahir_Elevation_OP4_6_-_Photo_ow7oy0.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121937/Mr.Zahir_Elevation_OP4_3_-_Photo_nxoyzf.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121923/Mr.Zahir_Elevation_OP4_12_-_Photo_zxg6ne.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121925/Mr.Zahir_Elevation_OP4_13_-_Photo_kwj4j0.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121938/Mr.Zahir_Elevation_OP4_16_-_Photo_2_cemyge.jpg",
      ],
      name: "Mr. Zahir"
    },
    "3": {
      images: [
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121935/Mr.Zahir_Elevation_OP4_16_-_Photo_rrmm5i.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121922/Mr.Zahir_Elevation_OP4_6_-_Photo_ow7oy0.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121937/Mr.Zahir_Elevation_OP4_3_-_Photo_nxoyzf.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121923/Mr.Zahir_Elevation_OP4_12_-_Photo_zxg6ne.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121925/Mr.Zahir_Elevation_OP4_13_-_Photo_kwj4j0.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121938/Mr.Zahir_Elevation_OP4_16_-_Photo_2_cemyge.jpg",
      ],
      name: "Mr. Zahir"
    },
  },

  // Nirmal Location
  nirmal: {
    "1": {
      images: [
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121987/Mr.Girish_Reddy_Elevation_Renders_6_-_Photo_lnwgad.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122035/Mr.Girish_Reddy_Elevation_Renders_9_-_Photo_ziktff.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121994/Mr.Girish_Reddy_Elevation_Renders_16_-_Photo_2_xgrhtl.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121989/Mr.Girish_Reddy_Elevation_Renders_11_-_Photo_iz9gyt.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121991/Mr.Girish_Reddy_Elevation_Renders_13_-_Photo_fvjber.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121993/Mr.Girish_Reddy_Elevation_Renders_14_-_Photo_qc9bbw.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121996/Mr.Girish_Reddy_Elevation_Renders_2_-_Photo_ak2ant.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121998/Mr.Girish_Reddy_Elevation_Renders_5_-_Photo_icml6v.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122036/Mr.Girish_Reddy_Elevation_Renders_12_-_Photo_r7rc6g.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122038/Mr.Girish_Reddy_Elevation_Renders_19_-_Photo_lobnpz.jpg",
      ],
      name: "Mr. Girish Reddy"
    },
    "2": {
      images: [
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121987/Mr.Girish_Reddy_Elevation_Renders_6_-_Photo_lnwgad.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122035/Mr.Girish_Reddy_Elevation_Renders_9_-_Photo_ziktff.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121994/Mr.Girish_Reddy_Elevation_Renders_16_-_Photo_2_xgrhtl.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121989/Mr.Girish_Reddy_Elevation_Renders_11_-_Photo_iz9gyt.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121991/Mr.Girish_Reddy_Elevation_Renders_13_-_Photo_fvjber.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121993/Mr.Girish_Reddy_Elevation_Renders_14_-_Photo_qc9bbw.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121996/Mr.Girish_Reddy_Elevation_Renders_2_-_Photo_ak2ant.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121998/Mr.Girish_Reddy_Elevation_Renders_5_-_Photo_icml6v.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122036/Mr.Girish_Reddy_Elevation_Renders_12_-_Photo_r7rc6g.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122038/Mr.Girish_Reddy_Elevation_Renders_19_-_Photo_lobnpz.jpg",
      ],
      name: "Mr. Girish Reddy"
    },
    "3": {
      images: [
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121987/Mr.Girish_Reddy_Elevation_Renders_6_-_Photo_lnwgad.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122035/Mr.Girish_Reddy_Elevation_Renders_9_-_Photo_ziktff.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121994/Mr.Girish_Reddy_Elevation_Renders_16_-_Photo_2_xgrhtl.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121989/Mr.Girish_Reddy_Elevation_Renders_11_-_Photo_iz9gyt.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121991/Mr.Girish_Reddy_Elevation_Renders_13_-_Photo_fvjber.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121993/Mr.Girish_Reddy_Elevation_Renders_14_-_Photo_qc9bbw.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121996/Mr.Girish_Reddy_Elevation_Renders_2_-_Photo_ak2ant.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766121998/Mr.Girish_Reddy_Elevation_Renders_5_-_Photo_icml6v.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122036/Mr.Girish_Reddy_Elevation_Renders_12_-_Photo_r7rc6g.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122038/Mr.Girish_Reddy_Elevation_Renders_19_-_Photo_lobnpz.jpg",
      ],
      name: "Mr. Girish Reddy"
    },
  },

  // Ireland Location
  ireland: {
    "1": {
      images: [
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122121/Mr.G_Narender_Reddy_Landscape_Renders_1_-_Photo_ifxtjz.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122127/Mr.G_Narender_Reddy_Landscape_Renders_14_-_Photo_r63hok.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122131/Mr.G_Narender_Reddy_Landscape_Renders_4_-_Photo_dpewly.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122129/Mr.G_Narender_Reddy_Landscape_Renders_34_-_Photo_diizih.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122123/Mr.G_Narender_Reddy_Landscape_Renders_6_-_Photo_uprfbw.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122119/Mr.G_Narender_Reddy_Landscape_Renders_30_-_Photo_pmpnkh.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122117/Mr.G_Narender_Reddy_Landscape_Renders_26_-_Photo_h3uube.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122114/Mr.G_Narender_Reddy_Landscape_Renders_24_-_Photo_f4y0di.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122111/Mr.G_Narender_Reddy_Landscape_Renders_22_-_Photo_ypm4ip.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122107/Mr.G_Narender_Reddy_Landscape_Renders_50_-_Photo_hwhffz.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122105/Mr.G_Narender_Reddy_Landscape_Renders_42_-_Photo_dffb7x.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122103/Mr.G_Narender_Reddy_Landscape_Renders_38_-_Photo_vebtym.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122100/Mr.G_Narender_Reddy_Landscape_Renders_36_-_Photo_tc8wqe.jpg",
      ],
      name: "Mr.G Narender Reddy"
    },
    "2": {
      images: [
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122121/Mr.G_Narender_Reddy_Landscape_Renders_1_-_Photo_ifxtjz.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122127/Mr.G_Narender_Reddy_Landscape_Renders_14_-_Photo_r63hok.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122131/Mr.G_Narender_Reddy_Landscape_Renders_4_-_Photo_dpewly.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122129/Mr.G_Narender_Reddy_Landscape_Renders_34_-_Photo_diizih.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122123/Mr.G_Narender_Reddy_Landscape_Renders_6_-_Photo_uprfbw.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122119/Mr.G_Narender_Reddy_Landscape_Renders_30_-_Photo_pmpnkh.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122117/Mr.G_Narender_Reddy_Landscape_Renders_26_-_Photo_h3uube.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122114/Mr.G_Narender_Reddy_Landscape_Renders_24_-_Photo_f4y0di.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122111/Mr.G_Narender_Reddy_Landscape_Renders_22_-_Photo_ypm4ip.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122107/Mr.G_Narender_Reddy_Landscape_Renders_50_-_Photo_hwhffz.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122105/Mr.G_Narender_Reddy_Landscape_Renders_42_-_Photo_dffb7x.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122103/Mr.G_Narender_Reddy_Landscape_Renders_38_-_Photo_vebtym.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122100/Mr.G_Narender_Reddy_Landscape_Renders_36_-_Photo_tc8wqe.jpg",
      ],
      name: "Mr.G Narender Reddy"
    },
    "3": {
      images: [
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122121/Mr.G_Narender_Reddy_Landscape_Renders_1_-_Photo_ifxtjz.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122127/Mr.G_Narender_Reddy_Landscape_Renders_14_-_Photo_r63hok.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122131/Mr.G_Narender_Reddy_Landscape_Renders_4_-_Photo_dpewly.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122129/Mr.G_Narender_Reddy_Landscape_Renders_34_-_Photo_diizih.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122123/Mr.G_Narender_Reddy_Landscape_Renders_6_-_Photo_uprfbw.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122119/Mr.G_Narender_Reddy_Landscape_Renders_30_-_Photo_pmpnkh.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122117/Mr.G_Narender_Reddy_Landscape_Renders_26_-_Photo_h3uube.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122114/Mr.G_Narender_Reddy_Landscape_Renders_24_-_Photo_f4y0di.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122111/Mr.G_Narender_Reddy_Landscape_Renders_22_-_Photo_ypm4ip.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122107/Mr.G_Narender_Reddy_Landscape_Renders_50_-_Photo_hwhffz.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122105/Mr.G_Narender_Reddy_Landscape_Renders_42_-_Photo_dffb7x.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122103/Mr.G_Narender_Reddy_Landscape_Renders_38_-_Photo_vebtym.jpg",
        "https://res.cloudinary.com/da9ppibpk/image/upload/v1766122100/Mr.G_Narender_Reddy_Landscape_Renders_36_-_Photo_tc8wqe.jpg",
      ],
      name: "Mr.G Narender Reddy"
    },
  },
};

/**
 * Parse client ID in format "location-clientNumber" (e.g., "guntur-1")
 * Returns [location, clientNumber] or null if invalid
 */
function parseClientId(clientId: string): [string, string] | null {
  const parts = clientId.split("-");
  if (parts.length < 2) {
    return null;
  }
  const clientNumber = parts[parts.length - 1];
  const location = parts.slice(0, -1).join("-");
  return [location, clientNumber];
}

/**
 * Determine if an image is Interior or Exterior based on URL patterns
 * @param imageUrl - Image URL string
 * @returns "Interior" or "Exterior"
 */
function getImageLabel(imageUrl: string): "Interior" | "Exterior" {
  const urlLower = imageUrl.toLowerCase();
  
  // Check for exterior patterns
  if (urlLower.includes('elevation') || urlLower.includes('landscape')) {
    return "Exterior";
  }
  
  // Check for interior patterns
  if (urlLower.includes('interior') || urlLower.includes('bedroom') || 
      urlLower.includes('living') || urlLower.includes('room') || 
      urlLower.includes('guest') || urlLower.includes('master')) {
    return "Interior";
  }
  
  // Default to Exterior if no pattern matches
  return "Exterior";
}

export interface ClientImage {
  url: string;
  label: "Interior" | "Exterior";
}

/**
 * Get client images by client ID (format: "location-clientNumber")
 * @param clientId - Client ID in format "location-clientNumber" (e.g., "guntur-1")
 * @returns Array of image objects with url and label properties
 */
export function getClientImages(clientId: string): ClientImage[] {
  const parsed = parseClientId(clientId);
  if (!parsed) {
    return [];
  }
  const [location, clientNumber] = parsed;
  const images = clientDataByLocation[location]?.[clientNumber]?.images || [];
  
  return images.map(url => ({
    url,
    label: getImageLabel(url)
  }));
}

/**
 * Get client name by client ID (format: "location-clientNumber")
 * @param clientId - Client ID in format "location-clientNumber" (e.g., "guntur-1")
 */
export function getClientName(clientId: string): string {
  const parsed = parseClientId(clientId);
  if (!parsed) {
    return `Client Project ${clientId}`;
  }
  const [location, clientNumber] = parsed;
  return clientDataByLocation[location]?.[clientNumber]?.name || `Client Project ${clientId}`;
}

/**
 * Get all client IDs across all locations
 * Returns array of client IDs in format "location-clientNumber"
 */
export function getAllClientIds(): string[] {
  const clientIds: string[] = [];
  for (const [location, clients] of Object.entries(clientDataByLocation)) {
    for (const clientNumber of Object.keys(clients)) {
      clientIds.push(`${location}-${clientNumber}`);
    }
  }
  return clientIds;
}

/**
 * Get all client IDs for a specific location
 * @param location - Location name (e.g., "guntur", "hyderabad")
 */
export function getClientIdsByLocation(location: string): string[] {
  const clients = clientDataByLocation[location.toLowerCase()];
  if (!clients) {
    return [];
  }
  return Object.keys(clients).map(clientNumber => `${location.toLowerCase()}-${clientNumber}`);
}
