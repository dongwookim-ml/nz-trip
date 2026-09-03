// 사진 URL (Wikimedia Commons) 과 출처 목록
const IMG = {
  "hero": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Milford_Sound_New_Zealand_2016.jpg/1280px-Milford_Sound_New_Zealand_2016.jpg",
  "zqn": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Queenstown_Airport.jpg/960px-Queenstown_Airport.jpg",
  "paknsave": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Pak%27nSave_supermarket_Dunedin%2C_10_Dec_2025.jpg/960px-Pak%27nSave_supermarket_Dunedin%2C_10_Dec_2025.jpg",
  "devils_staircase": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Panoramic_view_over_Lake_Wakatipu_from_Devil%27s_Staircase_lookout.jpg/960px-Panoramic_view_over_Lake_Wakatipu_from_Devil%27s_Staircase_lookout.jpg",
  "kingston": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Lake_Wakatipu_%2848990266862%29.jpg/960px-Lake_Wakatipu_%2848990266862%29.jpg",
  "teanau_lakefront": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/00_1357_New_Zealand_-_Te_Anau_and_Lake_Te_Anau.jpg/960px-00_1357_New_Zealand_-_Te_Anau_and_Lake_Te_Anau.jpg",
  "glowworm": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Milky_Way_Glowworm_Cave.jpg/960px-Milky_Way_Glowworm_Cave.jpg",
  "bird_sanctuary": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Takahe_Te_Anau_1.jpg/960px-Takahe_Te_Anau_1.jpg",
  "rainbow_reach": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/NZ180315_Waiau_River_Rainbow_Reach_01.jpg/960px-NZ180315_Waiau_River_Rainbow_Reach_01.jpg",
  "eglinton": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Eglinton_Valley_NZ_02.jpg/960px-Eglinton_Valley_NZ_02.jpg",
  "mirror_lakes": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mirror_Lakes_in_Fiordland_National_Park_05.jpg/960px-Mirror_Lakes_in_Fiordland_National_Park_05.jpg",
  "knobs_flat": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Knobs_Flat_view.JPG/960px-Knobs_Flat_view.JPG",
  "monkey_creek": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Monkey_Creek%2C_New_Zealand_01.jpg/960px-Monkey_Creek%2C_New_Zealand_01.jpg",
  "homer_tunnel": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/00_1365_New_Zealand_-_Homer_Tunnel_%28Milford_Sound%29.jpg/960px-00_1365_New_Zealand_-_Homer_Tunnel_%28Milford_Sound%29.jpg",
  "lake_gunn": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/00_1358_New_Zealand%2C_Lake_Gunn._-_Fiordland_National_Park.jpg/960px-00_1358_New_Zealand%2C_Lake_Gunn._-_Fiordland_National_Park.jpg",
  "milford_hero": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Milford_Sound_New_Zealand_2016.jpg/1280px-Milford_Sound_New_Zealand_2016.jpg",
  "milford_cruise": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Cruising_Milford_Sound_NZ_%2813942701199%29.jpg/960px-Cruising_Milford_Sound_NZ_%2813942701199%29.jpg",
  "arrowtown": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Buckingham_Street%2C_Arrowtown_343.jpg/960px-Buckingham_Street%2C_Arrowtown_343.jpg",
  "chinese_settlement": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Arrowtown_Chinese_Settlement%2C_New_Zealand%3B_September_2014.jpg/960px-Arrowtown_Chinese_Settlement%2C_New_Zealand%3B_September_2014.jpg",
  "onsen": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/The_Shotover_River_Otago._NZ_%2823416513585%29.jpg/960px-The_Shotover_River_Otago._NZ_%2823416513585%29.jpg",
  "kawarau_bridge": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Kawarau_Gorge._Otago_NZ.jpg/960px-Kawarau_Gorge._Otago_NZ.jpg",
  "gibbston": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Gibbston_Valley_Winery_JH.jpg/960px-Gibbston_Valley_Winery_JH.jpg",
  "skyline": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Skyline_Queenstown_Gondola.jpg/1280px-Skyline_Queenstown_Gondola.jpg",
  "roaring_meg": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Kawarau_Gorge_with_the_Roaring_Meg_Hydro_Power_Station_2025.jpg/960px-Kawarau_Gorge_with_the_Roaring_Meg_Hydro_Power_Station_2025.jpg",
  "cromwell": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Giant_Fruit_Sculpture_-_Cromwell%2C_New_Zealand_%2832883069321%29.jpg/960px-Giant_Fruit_Sculpture_-_Cromwell%2C_New_Zealand_%2832883069321%29.jpg",
  "lindis_pass": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Lindis_Pass_%28Unsplash%29.jpg/1280px-Lindis_Pass_%28Unsplash%29.jpg",
  "salmon": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Lake_Pukaki_21.jpg/960px-Lake_Pukaki_21.jpg",
  "pukaki": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Lake_Pukaki_%26_Aoraki_Mount_Cook_01.jpg/960px-Lake_Pukaki_%26_Aoraki_Mount_Cook_01.jpg",
  "hooker_valley": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/NZ_Hooker_Valley_track.jpg/1280px-NZ_Hooker_Valley_track.jpg",
  "kea_point": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Mueller_Lake_from_Kea_Point_04.jpg/960px-Mueller_Lake_from_Kea_Point_04.jpg",
  "tasman_glacier": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Tasman_Lake_and_Tasman_Glacier.jpg/960px-Tasman_Lake_and_Tasman_Glacier.jpg",
  "hermitage": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/00_1700_Aoraki_Mount_Cook%2CThe_Hermitage_-_Mount-Cook-Nationalpark.jpg/960px-00_1700_Aoraki_Mount_Cook%2CThe_Hermitage_-_Mount-Cook-Nationalpark.jpg",
  "good_shepherd": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Church_of_the_Good_Shepherd%2C_Lake_Tekapo%2C_New_Zealand.jpg/1280px-Church_of_the_Good_Shepherd%2C_Lake_Tekapo%2C_New_Zealand.jpg",
  "mt_john": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Mount_John_University_Observatory_%289618676129%29.jpg/960px-Mount_John_University_Observatory_%289618676129%29.jpg",
  "fairlie": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Fairlie_Bakehouse.jpg/960px-Fairlie_Bakehouse.jpg",
  "christchurch": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Christchurch_Tram_at_Cathedral_Square_01.jpg/960px-Christchurch_Tram_at_Cathedral_Square_01.jpg",
  "chc": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Christchurch_Airport_826.jpg/1280px-Christchurch_Airport_826.jpg",
  "campervan": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Rental_Camper_van_from_Waka_Campa%2C_New_Zealand.jpg/960px-Rental_Camper_van_from_Waka_Campa%2C_New_Zealand.jpg"
};
const CREDITS = [
  {
    "title": "Milford Sound New Zealand 2016.jpg",
    "author": "Bernard Spragg. NZ from Christchurch, New Zealand",
    "license": "Public domain",
    "page": "https://commons.wikimedia.org/wiki/File:Milford_Sound_New_Zealand_2016.jpg"
  },
  {
    "title": "Queenstown Airport.jpg",
    "author": "JoeB",
    "license": "CC BY-SA 4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Queenstown_Airport.jpg"
  },
  {
    "title": "Pak'nSave supermarket Dunedin, 10 Dec 2025.jpg",
    "author": "Andykatib",
    "license": "CC0",
    "page": "https://commons.wikimedia.org/wiki/File:Pak'nSave_supermarket_Dunedin,_10_Dec_2025.jpg"
  },
  {
    "title": "Panoramic view over Lake Wakatipu from Devil's Staircase lookout.jpg",
    "author": "Pseudopanax at English Wikipedia",
    "license": "Public domain",
    "page": "https://commons.wikimedia.org/wiki/File:Panoramic_view_over_Lake_Wakatipu_from_Devil's_Staircase_lookout.jpg"
  },
  {
    "title": "Lake Wakatipu (48990266862).jpg",
    "author": "Kevin Prince",
    "license": "CC BY-SA 2.0",
    "page": "https://commons.wikimedia.org/wiki/File:Lake_Wakatipu_(48990266862).jpg"
  },
  {
    "title": "00 1357 New Zealand - Te Anau and Lake Te Anau.jpg",
    "author": "W. Bulach",
    "license": "CC BY-SA 4.0",
    "page": "https://commons.wikimedia.org/wiki/File:00_1357_New_Zealand_-_Te_Anau_and_Lake_Te_Anau.jpg"
  },
  {
    "title": "Milky Way Glowworm Cave.jpg",
    "author": "Ian Fox at Waipu Caves Farm Park",
    "license": "CC0",
    "page": "https://commons.wikimedia.org/wiki/File:Milky_Way_Glowworm_Cave.jpg"
  },
  {
    "title": "Takahe Te Anau 1.jpg",
    "author": "Harald Selke",
    "license": "CC BY-SA 2.0",
    "page": "https://commons.wikimedia.org/wiki/File:Takahe_Te_Anau_1.jpg"
  },
  {
    "title": "NZ180315 Waiau River Rainbow Reach 01.jpg",
    "author": "Oren Rozen",
    "license": "CC BY-SA 3.0",
    "page": "https://commons.wikimedia.org/wiki/File:NZ180315_Waiau_River_Rainbow_Reach_01.jpg"
  },
  {
    "title": "Eglinton Valley NZ 02.jpg",
    "author": "Krzysztof Golik",
    "license": "CC BY-SA 4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Eglinton_Valley_NZ_02.jpg"
  },
  {
    "title": "Mirror Lakes in Fiordland National Park 05.jpg",
    "author": "Krzysztof Golik",
    "license": "CC BY-SA 4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Mirror_Lakes_in_Fiordland_National_Park_05.jpg"
  },
  {
    "title": "Knobs Flat view.JPG",
    "author": "Andy king50",
    "license": "CC BY-SA 3.0",
    "page": "https://commons.wikimedia.org/wiki/File:Knobs_Flat_view.JPG"
  },
  {
    "title": "Monkey Creek, New Zealand 01.jpg",
    "author": "Σ64",
    "license": "CC BY 4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Monkey_Creek,_New_Zealand_01.jpg"
  },
  {
    "title": "00 1365 New Zealand - Homer Tunnel (Milford Sound).jpg",
    "author": "W. Bulach",
    "license": "CC BY-SA 4.0",
    "page": "https://commons.wikimedia.org/wiki/File:00_1365_New_Zealand_-_Homer_Tunnel_(Milford_Sound).jpg"
  },
  {
    "title": "00 1358 New Zealand, Lake Gunn. - Fiordland National Park.jpg",
    "author": "W. Bulach",
    "license": "CC BY-SA 4.0",
    "page": "https://commons.wikimedia.org/wiki/File:00_1358_New_Zealand,_Lake_Gunn._-_Fiordland_National_Park.jpg"
  },
  {
    "title": "Cruising Milford Sound NZ (13942701199).jpg",
    "author": "Bernard Spragg. NZ from Christchurch, New Zealand",
    "license": "CC0",
    "page": "https://commons.wikimedia.org/wiki/File:Cruising_Milford_Sound_NZ_(13942701199).jpg"
  },
  {
    "title": "Buckingham Street, Arrowtown 343.jpg",
    "author": "Schwede66",
    "license": "CC BY-SA 4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Buckingham_Street,_Arrowtown_343.jpg"
  },
  {
    "title": "Arrowtown Chinese Settlement, New Zealand; September 2014.jpg",
    "author": "Bernard Spragg. NZ",
    "license": "CC0",
    "page": "https://commons.wikimedia.org/wiki/File:Arrowtown_Chinese_Settlement,_New_Zealand;_September_2014.jpg"
  },
  {
    "title": "The Shotover River Otago. NZ (23416513585).jpg",
    "author": "Bernard Spragg. NZ from Christchurch, New Zealand",
    "license": "CC0",
    "page": "https://commons.wikimedia.org/wiki/File:The_Shotover_River_Otago._NZ_(23416513585).jpg"
  },
  {
    "title": "Kawarau Gorge. Otago NZ.jpg",
    "author": "Bernard Spragg. NZ",
    "license": "CC0",
    "page": "https://commons.wikimedia.org/wiki/File:Kawarau_Gorge._Otago_NZ.jpg"
  },
  {
    "title": "Gibbston Valley Winery JH.jpg",
    "author": "Jan Helebrant",
    "license": "CC0",
    "page": "https://commons.wikimedia.org/wiki/File:Gibbston_Valley_Winery_JH.jpg"
  },
  {
    "title": "Skyline Queenstown Gondola.jpg",
    "author": "Skyline Enterprises NZ",
    "license": "CC BY-SA 4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Skyline_Queenstown_Gondola.jpg"
  },
  {
    "title": "Kawarau Gorge with the Roaring Meg Hydro Power Station 2025.jpg",
    "author": "Nixovel",
    "license": "CC BY-SA 4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Kawarau_Gorge_with_the_Roaring_Meg_Hydro_Power_Station_2025.jpg"
  },
  {
    "title": "Giant Fruit Sculpture - Cromwell, New Zealand (32883069321).jpg",
    "author": "Bernard Spragg. NZ from Christchurch, New Zealand",
    "license": "CC0",
    "page": "https://commons.wikimedia.org/wiki/File:Giant_Fruit_Sculpture_-_Cromwell,_New_Zealand_(32883069321).jpg"
  },
  {
    "title": "Lindis Pass (Unsplash).jpg",
    "author": "Cassie Matias cass4504",
    "license": "CC0",
    "page": "https://commons.wikimedia.org/wiki/File:Lindis_Pass_(Unsplash).jpg"
  },
  {
    "title": "Lake Pukaki 21.jpg",
    "author": "Krzysztof Golik",
    "license": "CC BY-SA 4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Lake_Pukaki_21.jpg"
  },
  {
    "title": "Lake Pukaki & Aoraki Mount Cook 01.jpg",
    "author": "Krzysztof Golik",
    "license": "CC BY-SA 4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Lake_Pukaki_&_Aoraki_Mount_Cook_01.jpg"
  },
  {
    "title": "NZ Hooker Valley track.jpg",
    "author": "Jan Helebrant",
    "license": "CC0",
    "page": "https://commons.wikimedia.org/wiki/File:NZ_Hooker_Valley_track.jpg"
  },
  {
    "title": "Mueller Lake from Kea Point 04.jpg",
    "author": "Krzysztof Golik",
    "license": "CC BY-SA 4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Mueller_Lake_from_Kea_Point_04.jpg"
  },
  {
    "title": "Tasman Lake and Tasman Glacier.jpg",
    "author": "Krzysztof Golik",
    "license": "CC BY-SA 4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Tasman_Lake_and_Tasman_Glacier.jpg"
  },
  {
    "title": "00 1700 Aoraki Mount Cook,The Hermitage - Mount-Cook-Nationalpark.jpg",
    "author": "W. Bulach",
    "license": "CC BY-SA 4.0",
    "page": "https://commons.wikimedia.org/wiki/File:00_1700_Aoraki_Mount_Cook,The_Hermitage_-_Mount-Cook-Nationalpark.jpg"
  },
  {
    "title": "Church of the Good Shepherd, Lake Tekapo, New Zealand.jpg",
    "author": "Jillianalma",
    "license": "CC BY-SA 4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Church_of_the_Good_Shepherd,_Lake_Tekapo,_New_Zealand.jpg"
  },
  {
    "title": "Mount John University Observatory (9618676129).jpg",
    "author": "Bernard Spragg. NZ from Christchurch, New Zealand",
    "license": "CC0",
    "page": "https://commons.wikimedia.org/wiki/File:Mount_John_University_Observatory_(9618676129).jpg"
  },
  {
    "title": "Fairlie Bakehouse.jpg",
    "author": "Orangesclub",
    "license": "CC BY 4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Fairlie_Bakehouse.jpg"
  },
  {
    "title": "Christchurch Tram at Cathedral Square 01.jpg",
    "author": "Krzysztof Golik",
    "license": "CC BY-SA 4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Christchurch_Tram_at_Cathedral_Square_01.jpg"
  },
  {
    "title": "Christchurch Airport 826.jpg",
    "author": "Schwede66",
    "license": "CC BY-SA 4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Christchurch_Airport_826.jpg"
  },
  {
    "title": "Rental Camper van from Waka Campa, New Zealand.jpg",
    "author": "LouisCeleste",
    "license": "CC0",
    "page": "https://commons.wikimedia.org/wiki/File:Rental_Camper_van_from_Waka_Campa,_New_Zealand.jpg"
  }
];
