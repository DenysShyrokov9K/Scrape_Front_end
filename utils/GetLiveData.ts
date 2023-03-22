import {
  generateDigiKeyTable,
  generateMouserTableData,
  generateTableData,
} from "./TableGenerator";
import Papa from "papaparse";
import axios from "axios";
import fetchMouser, {
  fetchDigiKey,
  fetchFutureElectronics,
} from "./ApiHandlers";

interface liveDataProps {
  supplier: string;
  partnumbers: string[];
  isCsv?: boolean;
}
export async function getLiveManufacturerData({
  supplier,
  partnumbers,
  isCsv,
}: liveDataProps) {
  console.log("before", partnumbers);
  const re = /^[0-9\b]+$/;
  var partnumbers = partnumbers.filter(function (el) {
    // return el != null && re.test(el);
    return el != null;
  });
  console.log("before AFTER", partnumbers);
  if (supplier == "Molex") {
    try {
      if (!isCsv) {
        let rawData: any = [];
        let failedData: any = [];
        await Promise.all(
          partnumbers.map(async (keyword: string) => {
            keyword.trim().replace("/", "&45F");
            const response = await axios.get(
              `http://147.189.161.152/molex/${keyword}`
            );

            if (response && response.data.status !== 404) {
              rawData = [...rawData, ...[response.data]];
            } else {
              failedData = [...failedData, keyword];
            }
          })
        );

        const csv_data = Papa.unparse(rawData);
        const LiveData = generateTableData(rawData);
        return { csv_data, LiveData, failedData };
      } else {
        let rawData: any[] = [];
        let failedData: any = [];
        // console.log("before",partnumbers);
        // const re = /^[0-9\b]+$/;
        // var partnumbers = partnumbers.filter(function (el) {
        //   return el != null && re.test(el);
        // });

        const getData = async (index) => {
          const partnumber = partnumbers[index];
          const response = await axios.get(
            `http://147.189.161.152/molexList/${partnumber}`
          );
          if (response && response.data.status !== 404) {
            rawData = [...rawData, ...[response.data]];
          } else {
            failedData = [...failedData, partnumber];
          }
          if (index < partnumbers.length - 1) {
            await getData(index + 1);
          }
        };
        await getData(0);
        // return console.log(partnumbers)
        // await Promise.all(
        //   partnumbers.map(async (partnumber) => {
        //     const response = await axios.get(
        //       `http://147.189.161.152/phoenix/${partnumber}`
        //     );
        //     console.log(response.data);
        //     if (response && response.data.status !== 404) {
        //       rawData = [...rawData, ...[response.data]];
        //     } else {
        //       failedData = [...failedData, partnumber];
        //     }
        //   })
        // );
        const csv_data = Papa.unparse(rawData);
        const LiveData = generateTableData(rawData);
        return { csv_data, LiveData, failedData };
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  } else if (supplier == "Newark Electronics Corporation") {
    try {
      // if (isCsv) {
      let rawData: any = [];
      let failedData: any = [];
      await Promise.all(
        partnumbers.map(async (keyword: string) => {
          keyword.trim().replace("/", "&45F");
          const response = await axios.get(
            `http://147.189.161.152/scrap_newark/${keyword}`
          );

          if (response && response.data.status !== 404) {
            rawData = [...rawData, ...[response.data]];
          } else {
            failedData = [...failedData, keyword];
          }
        })
      );

      const csv_data = Papa.unparse(rawData);
      const LiveData = generateTableData(rawData);
      return { csv_data, LiveData, failedData };

      // } else {
      //   let rawData: any = [];
      //   let failedData: any = [];
      //   const response = await axios.get(
      //     `http://147.189.161.152/scrap_newark/${partnumbers}`
      //   );
      //   console.log(response.data)
      //   if (response.data.length) {
      //     for (const iterator of response.data) {
      //       console.log(iterator)
      //       if (iterator && iterator.Results == "Found") {
      //         rawData = [...rawData, ...[iterator]];
      //       } else {
      //         failedData = [...failedData, iterator];
      //       }
      //     }
      //   }
      //   const csv_data = Papa.unparse(rawData);
      //   const LiveData = generateTableData(rawData);

      //   return { csv_data, LiveData, failedData };

      // }
    } catch (error) {
      throw new Error(`${error}`);
    }
  } else if (supplier == "Panduit") {
    try {
      let rawData: any = [];
      let failedData: any = [];
      await Promise.all(
        partnumbers.map(async (keyword: string) => {
          keyword.trim().replace("/", "&45F");
          const response = await axios.get(
            `http://147.189.161.152/scrap_panduit/${keyword}`
          );

          if (response && response.data.status !== 404) {
            rawData = [...rawData, ...[response.data]];
          } else {
            failedData = [...failedData, keyword];
          }
        })
      );

      const csv_data = Papa.unparse(rawData);
      const LiveData = generateTableData(rawData);
      return { csv_data, LiveData, failedData };
    } catch (err) {
      throw new Error(`${err}`);
    }
  } else if (supplier == "Alpha Wire") {
    try {
      // if (!isCsv) {
        let rawData: any = [];
        let failedData: any = [];
        await Promise.all(
          partnumbers.map(async (keyword: string) => {
            console.log(keyword);
            keyword = keyword.trim().replace("/", "&45F");
            const response = await axios.get(
              `http://147.189.161.152/scrap_alphawire/${keyword}`
            );

            if (response && response.data.status !== 404) {
              rawData = [...rawData, ...[response.data]];
            } else {
              failedData = [...failedData, keyword];
            }
          })
        );

        const csv_data = Papa.unparse(rawData);
        const LiveData = generateTableData(rawData);
        return { csv_data, LiveData, failedData };
      // } 
      // else {
      //   let rawData: any = [];
      //   let failedData: any = [];
      //   console.log("-----------------TDK1111111------------------");
      //   console.log("partnumber:", partnumbers);
      //   const response = await axios.post(
      //     // `http://147.189.161.152/scrap_tdk_list`, { parts: partnumbers }
      //     `http://147.189.161.152/scrap_alphawire_list`,
      //     { parts: partnumbers }
      //   );
      //   console.log(response.data);
      //   if (response.data.length) {
      //     for (const iterator of response.data) {
      //       console.log(iterator);
      //       if (iterator && iterator.Results == "Found") {
      //         rawData = [...rawData, ...[iterator]];
      //       } else {
      //         failedData = [...failedData, iterator];
      //       }
      //     }
      //   }
      //   const csv_data = Papa.unparse(rawData);
      //   const LiveData = generateTableData(rawData);

      //   return { csv_data, LiveData, failedData };
      // }
    } catch (err) {
      console.log(err)
    }
  } 
  else if(supplier == 'Analog Devices'){
    try{
      let rawData: any = [];
        let failedData: any = [];
        await Promise.all(
          partnumbers.map(async (keyword: string) => {
            console.log(keyword);
            keyword = keyword.trim().replace("/", "&45F");
            const response = await axios.get(
              `http://147.189.161.152/scrap_analog/${keyword}`
            );

            if (response && response.data.status !== 404) {
              rawData = [...rawData, ...[response.data]];
            } else {
              failedData = [...failedData, keyword];
            }
          })
        );

        const csv_data = Papa.unparse(rawData);
        const LiveData = generateTableData(rawData);
        return { csv_data, LiveData, failedData };
    } catch(err){
      console.log(err)
    }
  }
  else if (supplier == "Festo") {
    try {
      // if (isCsv) {
      // let rawData: any = [];
      // let failedData: any = [];
      // await Promise.all(
      //   partnumbers.map(async (keyword: string) => {
      //     const response = await axios.get(
      //       `http://147.189.161.152/scrap_festo/${keyword}`
      //     );

      //     if (response && response.data.status !== 404) {
      //       rawData = [...rawData, ...[response.data]];
      //     } else {
      //       failedData = [...failedData, keyword];
      //     }
      //   })
      // );

      // const csv_data = Papa.unparse(rawData);
      // const LiveData = generateTableData(rawData);
      // return { csv_data, LiveData, failedData };

      let rawData: any = [];
      let failedData: any = [];
      const getData = async (index) => {
        const partnumber = partnumbers[index];
        const response = await axios.get(
          `http://147.189.161.152/scrap_festo/${partnumber}`
        );
        if (response && response.data.status !== 404) {
          rawData = [...rawData, ...[response.data]];
        } else {
          failedData = [...failedData, partnumber];
        }
        if (index < partnumbers.length - 1) {
          await getData(index + 1);
        }
      };
      await getData(0);
      const csv_data = Papa.unparse(rawData);
      const LiveData = generateTableData(rawData);
      return { csv_data, LiveData, failedData };
    } catch (error) {
      throw new Error(`${error}`);
    }
  } else if (supplier == "Murata Manufacturing Co") {
    if (!isCsv) {
      try {
        let rawData: any = [];
        let failedData: any = [];
        await Promise.all(
          partnumbers.map(async (keyword: string) => {
            keyword.trim().replace("/", "&45F");
            const response = await axios.get(
              // `http://147.189.161.152/scrap_murata/${keyword}`
              `http://147.189.161.152/scrap_murata/${keyword}`
            );
            if (response && response.data.status !== 404) {
              rawData = [...rawData, ...[response.data]];
            } else {
              failedData = [...failedData, keyword];
            }
          })
        );
        const csv_data = Papa.unparse(rawData);

        const LiveData = generateTableData(rawData);

        return { csv_data, LiveData, failedData };
      } catch (error) {
        throw new Error(`${error}`);
      }
    } else {
      let rawData: any = [];
      let failedData: any = [];
      const response = await axios.post(
        // `http://147.189.161.152/scrap_murata`, { parts: partnumbers }
        `http://147.189.161.152/scrap_murata`,
        { parts: partnumbers }
      );
      console.log(response.data);
      if (response.data.length) {
        for (const iterator of response.data) {
          console.log(iterator);
          if (iterator && iterator.Results == "Found") {
            rawData = [...rawData, ...[iterator]];
          } else {
            failedData = [...failedData, iterator];
          }
        }
      }
      const csv_data = Papa.unparse(rawData);
      const LiveData = generateTableData(rawData);

      return { csv_data, LiveData, failedData };
    }
  } else if (supplier == "Murata Manufacturing Co") {
    try {
      if (isCsv) {
        let rawData: any = [];
        let failedData: any = [];
        await Promise.all(
          partnumbers.map(async (keyword: string) => {
            keyword.trim().replace("/", "&45F");
            const response = await axios.get(
              `http://147.189.161.152/scrap_murata/${keyword}`
            );

            if (response && response.data.status !== 404) {
              rawData = [...rawData, ...[response.data]];
            } else {
              failedData = [...failedData, keyword];
            }
          })
        );

        const csv_data = Papa.unparse(rawData);
        const LiveData = generateTableData(rawData);
        return { csv_data, LiveData, failedData };
      } else {
        let rawData: any = [];
        let failedData: any = [];
        const response = await axios.get(
          `http://147.189.161.152/scrap_murata/${partnumbers}`
        );
        console.log(response.data);
        if (response.data.length) {
          for (const iterator of response.data) {
            console.log(iterator);
            if (iterator && iterator.Results == "Found") {
              rawData = [...rawData, ...[iterator]];
            } else {
              failedData = [...failedData, iterator];
            }
          }
        }
        const csv_data = Papa.unparse(rawData);
        const LiveData = generateTableData(rawData);

        return { csv_data, LiveData, failedData };
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  } else if (supplier == "Texas Instruments") {
    try {
      // if (!isCsv) {
      let rawData: any = [];
      let failedData: any = [];
      await Promise.all(
        partnumbers.map(async (keyword: string) => {
          keyword = keyword.trim().replace("/", "&45F");
          console.log(keyword);
          const response = await axios.get(
            `http://147.189.161.152/scrap_ti/${keyword}`
          );

          if (response && response.data.status !== 404) {
            rawData = [...rawData, ...[response.data]];
          } else {
            failedData = [...failedData, keyword];
          }
        })
      );

      const csv_data = Papa.unparse(rawData);
      const LiveData = generateTableData(rawData);
      return { csv_data, LiveData, failedData };

      // } else {
      //   let rawData: any = [];
      //   let failedData: any = [];
      //   const response = await axios.get(
      //     `http://147.189.161.152/scrap_ti/${partnumbers}`
      //   );
      //   console.log(response.data)
      //   if (response.data.length) {
      //     for (const iterator of response.data) {
      //       console.log(iterator)
      //       if (iterator && iterator.Results == "Found") {
      //         rawData = [...rawData, ...[iterator]];
      //       } else {
      //         failedData = [...failedData, iterator];
      //       }
      //     }
      //   }
      //   const csv_data = Papa.unparse(rawData);
      //   const LiveData = generateTableData(rawData);

      //   return { csv_data, LiveData, failedData };

      // }
    } catch (error) {
      throw new Error(`${error}`);
    }
  } else if (supplier == "3M Company") {
    try {
      let rawData: any = [];
      let failedData: any = [];
      const getData = async (index) => {
        const partnumber = partnumbers[index];
        const response = await axios.get(
          `http://147.189.161.152/scrap_3m/${partnumber}`
        );
        if (response && response.data.status !== 404) {
          rawData = [...rawData, ...[response.data]];
        } else {
          failedData = [...failedData, partnumber];
        }
        if (index < partnumbers.length - 1) {
          await getData(index + 1);
        }
      };
      await getData(0);
      const csv_data = Papa.unparse(rawData);
      const LiveData = generateTableData(rawData);
      return { csv_data, LiveData, failedData };

      // let rawData: any = [];
      // let failedData: any = [];
      // await Promise.all(
      //   partnumbers.map(async (keyword: string) => {
      //     const response = await axios.get(
      //       `http://147.189.161.152/scrap_3m/${keyword}`
      //     );

      //     if (response && response.data.status !== 404) {
      //       rawData = [...rawData, ...[response.data]];
      //     } else {
      //       failedData = [...failedData, keyword];
      //     }
      //   })
      // );

      // const csv_data = Papa.unparse(rawData);
      // const LiveData = generateTableData(rawData);
      // return { csv_data, LiveData, failedData };
    } catch (error) {
      throw new Error(`${error}`);
    }
  } else if (supplier == "Maxim Integrated") {
    let rawData: any[] = [];
    let failedData: any = [];
    await Promise.all(
      partnumbers.map(async (partnumber) => {
        partnumber = partnumber.replace(/\//g, ":");
        const response = await axios.get(
          `http://147.189.161.152/maxim/${partnumber}`
        );
        if (response && response.data.status !== 404) {
          rawData = [...rawData, ...[response.data]];
        } else {
          failedData = [...failedData, partnumber];
        }
      })
    );
    const csv_data = Papa.unparse(rawData);
    const LiveData = generateTableData(rawData);
    console.log(LiveData);
    return { csv_data, LiveData, failedData };
  } else if (supplier.toLowerCase() == "onsemi") {
    try {
      let rawData: any = [];
      let failedData: any = [];
      await Promise.all(
        partnumbers.map(async (keyword: string) => {
          keyword.trim().replace("/", "&45F");
          const response = await axios.get(
            `http://147.189.161.152/onsemi/${keyword}`
          );

          if (response && response.data.status !== 404) {
            rawData = [...rawData, ...[response.data]];
          } else {
            failedData = [...failedData, keyword];
          }
        })
      );
      const csv_data = Papa.unparse(rawData);

      const LiveData = generateTableData(rawData);
      console.log(LiveData);
      return { csv_data, LiveData, failedData };
    } catch (error) {
      throw new Error(`${error}`);
    }
  } else if (supplier.toLowerCase() == "omron") {
    try {
      let rawData: any = [];
      let failedData: any = [];
      await Promise.all(
        partnumbers.map(async (keyword: string) => {
          keyword.trim().replace("/", "&45F");
          const response = await axios.get(
            `http://147.189.161.152/omron/${keyword}`
          );

          if (response && response.data.status !== 404) {
            rawData = [...rawData, ...[response.data]];
          } else {
            failedData = [...failedData, keyword];
          }
        })
      );
      const csv_data = Papa.unparse(rawData);

      const LiveData = generateTableData(rawData);
      console.log(LiveData);

      return { csv_data, LiveData, failedData };
    } catch (error) {
      throw new Error(`${error}`);
    }
  } else if (supplier == "Wago") {
    try {
      let rawData: any = [];
      let failedData: any = [];
      await Promise.all(
        partnumbers.map(async (keyword: string) => {
          keyword.trim().replace("/", "&45F");
          const response = await axios.get(
            `http://147.189.161.152/wago/${keyword}`
          );
          if (response && response.data.status !== 404) {
            rawData = [...rawData, ...[response.data]];
          } else {
            failedData = [...failedData, keyword];
          }
        })
      );
      const csv_data = Papa.unparse(rawData);

      const LiveData = generateTableData(rawData);
      console.log(LiveData);

      return { csv_data, LiveData, failedData };
    } catch (error) {
      throw new Error(`${error}`);
    }
  } else if (supplier == "TDK") {
    console.log("-----------------TDK------------------");
    if (!isCsv) {
      try {
        let rawData: any = [];
        let failedData: any = [];
        await Promise.all(
          partnumbers.map(async (keyword: string) => {
            keyword.trim().replace("/", "&45F");
            const response = await axios.get(
              // `http://147.189.161.152/scrap_tdk/${keyword}`
              `http://147.189.161.152/scrap_tdk/${keyword}`
            );
            if (response && response.data.status !== 404) {
              rawData = [...rawData, ...[response.data]];
            } else {
              failedData = [...failedData, keyword];
            }
          })
        );
        const csv_data = Papa.unparse(rawData);

        const LiveData = generateTableData(rawData);

        return { csv_data, LiveData, failedData };
      } catch (error) {
        throw new Error(`${error}`);
      }
    } else {
      let rawData: any = [];
      let failedData: any = [];
      console.log("-----------------TDK1111111------------------");
      console.log("partnumber:", partnumbers);
      const response = await axios.post(
        // `http://147.189.161.152/scrap_tdk_list`, { parts: partnumbers }
        `http://147.189.161.152/scrap_tdk_list`,
        { parts: partnumbers }
      );
      console.log(response.data);
      if (response.data.length) {
        for (const iterator of response.data) {
          console.log(iterator);
          if (iterator && iterator.Results == "Found") {
            rawData = [...rawData, ...[iterator]];
          } else {
            failedData = [...failedData, iterator];
          }
        }
      }
      const csv_data = Papa.unparse(rawData);
      const LiveData = generateTableData(rawData);

      return { csv_data, LiveData, failedData };
    }
  } else if (supplier == "Vishay") {
    if (!isCsv) {
      try {
        let rawData: any = [];
        let failedData: any = [];
        await Promise.all(
          partnumbers.map(async (keyword: string) => {
            keyword.trim().replace("/", "&45F");
            const response = await axios.get(
              // `http://147.189.161.152/scrap_vishay/${keyword}`
              `http://147.189.161.152/scrap_vishay/${keyword}`
            );
            console.log(response);
            if (response && response.data.status !== 404) {
              rawData = [...rawData, ...[response.data]];
            } else {
              failedData = [...failedData, keyword];
            }
          })
        );
        const csv_data = Papa.unparse(rawData);

        const LiveData = generateTableData(rawData);

        return { csv_data, LiveData, failedData };
      } catch (error) {
        throw new Error(`${error}`);
      }
    } else {
      let rawData: any = [];
      let failedData: any = [];
      const response = await axios.post(
        // `http://147.189.161.152/scrap_vishay_list`, { parts: partnumbers }
        `http://147.189.161.152/scrap_vishay_list`,
        { parts: partnumbers }
      );
      console.log(response, "-----");
      if (response.data.length) {
        for (const iterator of response.data) {
          console.log(iterator);
          if (iterator && iterator.Results == "Found") {
            rawData = [...rawData, ...[iterator]];
          } else {
            failedData = [...failedData, iterator];
          }
        }
      }
      const csv_data = Papa.unparse(rawData);
      const LiveData = generateTableData(rawData);

      return { csv_data, LiveData, failedData };
    }
  } else if (supplier == "Microchip") {
    if (!isCsv) {
      try {
        let rawData: any = [];
        let failedData: any = [];
        await Promise.all(
          partnumbers.map(async (keyword: string) => {
            keyword.trim().replace("/", "&45F");
            const response = await axios.get(
              // `http://147.189.161.152/scrap_microchip/${keyword}`
              `http://147.189.161.152/scrap_microchip/${keyword}`
            );
            console.log(response, "------ in microchip-------");
            if (response && response.data.status !== 404) {
              rawData = [...rawData, ...[response.data]];
            } else {
              failedData = [...failedData, keyword];
            }
          })
        );
        const csv_data = Papa.unparse(rawData);

        const LiveData = generateTableData(rawData);

        return { csv_data, LiveData, failedData };
      } catch (error) {
        throw new Error(`${error}`);
      }
    } else {
      let rawData: any = [];
      let failedData: any = [];
      const response = await axios.post(
        // `http://147.189.161.152/scrap_microchip_list`, { parts: partnumbers }
        `http://147.189.161.152/scrap_microchip_list`,
        { parts: partnumbers }
      );
      console.log(response.data);
      if (response.data.length) {
        for (const iterator of response.data) {
          console.log(iterator);
          if (iterator && iterator.Results == "Found") {
            rawData = [...rawData, ...[iterator]];
          } else {
            failedData = [...failedData, iterator];
          }
        }
      }
      const csv_data = Papa.unparse(rawData);
      const LiveData = generateTableData(rawData);

      return { csv_data, LiveData, failedData };
    }
  } else if (supplier == "Fair Rite") {
    if (!isCsv) {
      try {
        let rawData: any = [];
        let failedData: any = [];
        await Promise.all(
          partnumbers.map(async (keyword: string) => {
            keyword.trim().replace("/", "&45F");
            const response = await axios.get(
              // `http://147.189.161.152/scrap_fair_rite/${keyword}`
              `http://147.189.161.152/scrap_fair_rite/${keyword}`
            );
            if (response && response.data.status !== 404) {
              rawData = [...rawData, ...[response.data]];
            } else {
              failedData = [...failedData, keyword];
            }
          })
        );
        const csv_data = Papa.unparse(rawData);

        const LiveData = generateTableData(rawData);
        return { csv_data, LiveData, failedData };
      } catch (error) {
        throw new Error(`${error}`);
      }
    } else {
      let rawData: any = [];
      let failedData: any = [];
      const response = await axios.post(
        // `http://147.189.161.152/scrap_fair_rite_list`, { parts: partnumbers }
        // `http://147.189.161.152/scrap_fair_rite_list`, { parts: partnumbers }
        `http://147.189.161.152/scrap_fair_rite_list`,
        { parts: partnumbers }
      );
      if (response.data.length) {
        for (const iterator of response.data) {
          console.log(iterator);
          if (iterator && iterator.Results == "found") {
            rawData = [...rawData, ...[iterator]];
          } else {
            failedData = [...failedData, iterator];
          }
        }
      }
      const csv_data = Papa.unparse(rawData);
      const LiveData = generateTableData(rawData);

      return { csv_data, LiveData, failedData };
    }
  } else if (supplier == "TE") {
    if (!isCsv) {
      try {
        let rawData: any = [];
        let failedData: any = [];
        await Promise.all(
          partnumbers.map(async (keyword: string) => {
            keyword.trim().replace("/", "&45F");
            const response = await axios.get(
              // `http://147.189.161.152/te/${keyword}`
              `http://147.189.161.152/te/${keyword}`
            );
            if (response && response.data.status !== 404) {
              rawData = [...rawData, ...[response.data]];
            } else {
              failedData = [...failedData, keyword];
            }
          })
        );
        const csv_data = Papa.unparse(rawData);

        const LiveData = generateTableData(rawData);

        return { csv_data, LiveData, failedData };
      } catch (error) {
        throw new Error(`${error}`);
      }
    } else {
      let rawData: any = [];
      let failedData: any = [];
      const response = await axios.post(
        // `http://147.189.161.152/teList`, { parts: partnumbers }
        `http://147.189.161.152/teList`,
        { parts: partnumbers }
      );
      console.log(response.data);
      if (response.data.length) {
        for (const iterator of response.data) {
          console.log(iterator);
          if (iterator && iterator.Results == "Found") {
            rawData = [...rawData, ...[iterator]];
          } else {
            failedData = [...failedData, iterator];
          }
        }
      }
      const csv_data = Papa.unparse(rawData);
      const LiveData = generateTableData(rawData);

      return { csv_data, LiveData, failedData };
    }
  } else if (supplier == "Allegro") {
    if (!isCsv) {
      try {
        let rawData: any = [];
        let failedData: any = [];
        await Promise.all(
          partnumbers.map(async (keyword: string) => {
            keyword.trim().replace("/", "&45F");
            const response = await axios.get(
              // `http://147.189.161.152/scrap_allegro/${keyword}`
              // `http://147.189.161.152/scrap_allegro/${keyword}`
              `http://147.189.161.152/scrap_allegro/${keyword}`
            );
            if (response && response.data.status !== 404) {
              rawData = [...rawData, ...[response.data]];
            } else {
              failedData = [...failedData, keyword];
            }
          })
        );
        const csv_data = Papa.unparse(rawData);

        const LiveData = generateTableData(rawData);

        return { csv_data, LiveData, failedData };
      } catch (error) {
        throw new Error(`${error}`);
      }
    } else {
      let rawData: any = [];
      let failedData: any = [];
      const response = await axios.post(
        // `http://147.189.161.152/allegro_list`, { parts: partnumbers }
        `http://147.189.161.152/scrap_allegro_list`,
        { parts: partnumbers }
      );
      console.log(response.data);
      if (response.data.length) {
        for (const iterator of response.data) {
          console.log(iterator);
          if (iterator && iterator.Results == "Found") {
            rawData = [...rawData, ...[iterator]];
          } else {
            failedData = [...failedData, iterator];
          }
        }
      }
      const csv_data = Papa.unparse(rawData);
      const LiveData = generateTableData(rawData);

      return { csv_data, LiveData, failedData };
    }
  } else if (supplier == "Yageo") {
    if (!isCsv) {
      try {
        let rawData: any = [];
        let failedData: any = [];
        await Promise.all(
          partnumbers.map(async (keyword: string) => {
            keyword.trim().replace("/", "&45F");
            const response = await axios.get(
              // `http://147.189.161.152/scrap_yageo/${keyword}`
              // `http://147.189.161.152/scrap_yageo/${keyword}`
              `http://147.189.161.152/scrap_yageo/${keyword}`
            );
            if (response && response.data.status !== 404) {
              rawData = [...rawData, ...[response.data]];
            } else {
              failedData = [...failedData, keyword];
            }
          })
        );
        const csv_data = Papa.unparse(rawData);

        const LiveData = generateTableData(rawData);

        return { csv_data, LiveData, failedData };
      } catch (error) {
        throw new Error(`${error}`);
      }
    } else {
      let rawData: any = [];
      let failedData: any = [];
      const response = await axios.post(
        // `http://147.189.161.152/scrap_yageo_list`, { parts: partnumbers }
        `http://147.189.161.152/scrap_yageo_list`,
        { parts: partnumbers }
      );
      console.log(response.data);
      if (response.data.length) {
        for (const iterator of response.data) {
          console.log(iterator);
          if (iterator && iterator.Results == "Found") {
            rawData = [...rawData, ...[iterator]];
          } else {
            failedData = [...failedData, iterator];
          }
        }
      }
      const csv_data = Papa.unparse(rawData);
      const LiveData = generateTableData(rawData);

      return { csv_data, LiveData, failedData };
    }
  } else if (supplier == "Leespring") {
    if (!isCsv) {
      try {
        let rawData: any = [];
        let failedData: any = [];
        await Promise.all(
          partnumbers.map(async (keyword: string) => {
            keyword.trim().replace("/", "&45F");
            const response = await axios.get(
              // `http://147.189.161.152/scrap_leespring/${keyword}`
              // `http://147.189.161.152/scrap_leespring/${keyword}`
              `http://147.189.161.152/scrap_leespring/${keyword}`
            );
            if (response && response.data.status !== 404) {
              rawData = [...rawData, ...[response.data]];
            } else {
              failedData = [...failedData, keyword];
            }
          })
        );
        const csv_data = Papa.unparse(rawData);

        const LiveData = generateTableData(rawData);

        return { csv_data, LiveData, failedData };
      } catch (error) {
        throw new Error(`${error}`);
      }
    } else {
      let rawData: any = [];
      let failedData: any = [];
      const response = await axios.post(
        // `http://147.189.161.152/scrap_leespring_list`, { parts: partnumbers }
        `http://147.189.161.152/scrap_leespring_list`,
        { parts: partnumbers }
      );
      console.log(response, "--------");
      if (response.data.length) {
        for (const iterator of response.data) {
          console.log(iterator);
          if (iterator && iterator.Results == "Found") {
            rawData = [...rawData, ...[iterator]];
          } else {
            failedData = [...failedData, iterator];
          }
        }
      }
      const csv_data = Papa.unparse(rawData);
      const LiveData = generateTableData(rawData);

      return { csv_data, LiveData, failedData };
    }
  } else if (supplier == "Phoenix") {
    // alert("wow")
    let rawData: any[] = [];
    let failedData: any = [];
    // console.log("before",partnumbers);
    // const re = /^[0-9\b]+$/;
    // var partnumbers = partnumbers.filter(function (el) {
    //   return el != null && re.test(el);
    // });

    const getData = async (index) => {
      const partnumber = partnumbers[index];
      const response = await axios.get(
        `http://147.189.161.152/phoenix/${partnumber}`
      );
      if (response && response.data.status !== 404) {
        rawData = [...rawData, ...[response.data]];
      } else {
        failedData = [...failedData, partnumber];
      }
      if (index < partnumbers.length - 1) {
        await getData(index + 1);
      }
    };
    await getData(0);
    // return console.log(partnumbers)
    // await Promise.all(
    //   partnumbers.map(async (partnumber) => {
    //     const response = await axios.get(
    //       `http://147.189.161.152/phoenix/${partnumber}`
    //     );
    //     console.log(response.data);
    //     if (response && response.data.status !== 404) {
    //       rawData = [...rawData, ...[response.data]];
    //     } else {
    //       failedData = [...failedData, partnumber];
    //     }
    //   })
    // );
    const csv_data = Papa.unparse(rawData);
    const LiveData = generateTableData(rawData);
    return { csv_data, LiveData, failedData };
  }
}

export async function getLiveDistributersData({
  supplier,
  partnumbers,
  isCsv,
}: liveDataProps) {
  console.log("before", partnumbers);
  const re = /^[0-9\b]+$/;
  var partnumbers = partnumbers.filter(function (el) {
    // return el != null && re.test(el);
    return el != null;
  });

  if (supplier == "Mouser") {
    let rawData: any[] = [];
    let failedData: any = [];
    for (let partnumber of partnumbers) {
      const response = await axios.get(
        `http://147.189.161.152/mouser/${partnumber}`
      );
      if (response && response.data.status !== 404) {
        rawData = [...rawData, ...[response.data]];
      } else {
        failedData = [...failedData, partnumber];
      }
    }

    const csv_data = Papa.unparse(rawData);
    const LiveData = generateMouserTableData(rawData);

    return { csv_data, LiveData, failedData };
  } else if (supplier == "Digikey") {
    let rawData: any[] = [];
    let failedData: any = [];
    await Promise.all(
      partnumbers.map(async (partnumber) => {
        const response = await fetchDigiKey(partnumber);
        if (response && response?.status != "not found") {
          rawData = [...rawData, ...response];
        } else {
          failedData = [...failedData, partnumber];
        }
      })
    );
    const csv_data = Papa.unparse(rawData);
    const LiveData = generateDigiKeyTable(rawData);
    return { csv_data, LiveData, failedData };
  } else if (supplier.toLowerCase() == "arrow") {
    let rawData: any[] = [];
    let failedData: any = [];
    // console.log("before",partnumbers);
    // const re = /^[0-9\b]+$/;
    // var partnumbers = partnumbers.filter(function (el) {
    //   return el != null && re.test(el);
    // });
    var format = /[/]+/;
    const getData = async (index) => {
      let partnumber = partnumbers[index];
      if (format.test(partnumber)) {
        partnumber = "xyz";
      }
      const response = await axios.get(
        `http://147.189.161.152/arrow/${partnumber}`
      );
      if (response && response.data.status !== 404) {
        rawData = [...rawData, ...[response.data]];
      } else {
        failedData = [...failedData, partnumber];
      }
      if (index < partnumbers.length - 1) {
        await getData(index + 1);
      }
    };
    await getData(0);

    const csv_data = Papa.unparse(rawData);
    const LiveData = generateTableData(rawData);
    return { csv_data, LiveData, failedData };

    // let rawData: any[] = [];
    // let failedData: any = [];
    // await Promise.all(
    //   partnumbers.map(async (partnumber) => {
    //     const response = await axios.get(
    //       `http://147.189.161.152/arrow/${partnumber}`
    //     );
    //     if (response && response.data.status !== 404) {
    //       rawData = [...rawData, ...[response.data]];
    //     } else {
    //       failedData = [...failedData, partnumber];
    //     }
    //   })
    // );
    // const csv_data = Papa.unparse(rawData);
    // const LiveData = generateTableData(rawData);
    // console.log(LiveData);
    // return { csv_data, LiveData, failedData };
  } else if (supplier == "Maxim") {
    let rawData: any[] = [];
    let failedData: any = [];
    await Promise.all(
      partnumbers.map(async (partnumber) => {
        partnumber = partnumber.replace(/\//g, ":");
        const response = await axios.get(
          `http://147.189.161.152/maxim/${partnumber}`
        );
        if (response && response.data.status !== 404) {
          rawData = [...rawData, ...[response.data]];
        } else {
          failedData = [...failedData, partnumber];
        }
      })
    );
    const csv_data = Papa.unparse(rawData);
    const LiveData = generateTableData(rawData);
    console.log(LiveData);
    return { csv_data, LiveData, failedData };
  } else if (supplier == "Rs-components") {
    let rawData: any[] = [];
    let failedData: any = [];
    await Promise.all(
      partnumbers.map(async (partnumber) => {
        const response = await axios.get(
          `http://147.189.161.152/rscomponents/${partnumber}`
        );

        if (response && response.data.status !== 404) {
          rawData = [...rawData, ...[response.data]];
        } else {
          failedData = [...failedData, partnumber];
        }
      })
    );
    const csv_data = Papa.unparse(rawData);
    const LiveData = generateTableData(rawData);
    return { csv_data, LiveData, failedData };
  } else if (supplier == "Future Electronics") {
    let rawData: any[] = [];
    let failedData: any = [];
    await Promise.all(
      partnumbers.map(async (partnumber) => {
        const response = await fetchFutureElectronics(partnumber);
        console.log("herr", response);
        if (response && response[0]) {
          rawData = [...rawData, ...response];
        } else {
          failedData = [...failedData, partnumber];
        }
      })
    );
    const csv_data = Papa.unparse(rawData);
    const LiveData = generateTableData(rawData);
    console.log(LiveData);
    return { csv_data, LiveData, failedData };
  } else if (supplier == "Allied Electronics") {
    if (!isCsv) {
      try {
        let rawData: any = [];
        let failedData: any = [];
        await Promise.all(
          partnumbers.map(async (keyword: string) => {
            const response = await axios.get(
              // `http://147.189.161.152/scrap_alliedelectronics/${keyword}`
              `http://147.189.161.152/scrap_alliedelectronics/${keyword}`
            );
            if (response && response.data.status !== 404) {
              rawData = [...rawData, ...[response.data]];
            } else {
              failedData = [...failedData, keyword];
            }
          })
        );
        const csv_data = Papa.unparse(rawData);

        const LiveData = generateTableData(rawData);

        return { csv_data, LiveData, failedData };
      } catch (error) {
        throw new Error(`${error}`);
      }
    } else {
      let rawData: any = [];
      let failedData: any = [];
      const response = await axios.post(
        // `http://147.189.161.152/scrap_alliedelectronics_list`, { parts: partnumbers }
        `http://147.189.161.152/scrap_alliedelectronics_list`,
        { parts: partnumbers }
      );
      console.log(response.data);
      if (response.data.length) {
        for (const iterator of response.data) {
          console.log(iterator);
          if (iterator && iterator.Results == "Found") {
            rawData = [...rawData, ...[iterator]];
          } else {
            failedData = [...failedData, iterator];
          }
        }
      }
      const csv_data = Papa.unparse(rawData);
      const LiveData = generateTableData(rawData);

      return { csv_data, LiveData, failedData };
    }
  } else if (supplier == "R-S Hughes") {
    if (!isCsv) {
      try {
        let rawData: any = [];
        let failedData: any = [];
        await Promise.all(
          partnumbers.map(async (keyword: string) => {
            const response = await axios.get(
              // `http://147.189.161.152/scrap_rshughes/${keyword}`
              `http://147.189.161.152/scrap_rshughes/${keyword}`
            );
            if (response && response.data.status !== 404) {
              rawData = [...rawData, ...[response.data]];
            } else {
              failedData = [...failedData, keyword];
            }
          })
        );
        const csv_data = Papa.unparse(rawData);

        const LiveData = generateTableData(rawData);

        return { csv_data, LiveData, failedData };
      } catch (error) {
        throw new Error(`${error}`);
      }
    } else {
      let rawData: any = [];
      let failedData: any = [];
      const response = await axios.post(
        // `http://147.189.161.152/scrap_rshughes_list`, { parts: partnumbers }
        `http://147.189.161.152/sscrap_rshughes_list`,
        { parts: partnumbers }
      );
      console.log(response.data);
      if (response.data.length) {
        for (const iterator of response.data) {
          console.log(iterator);
          if (iterator && iterator.Results == "Found") {
            rawData = [...rawData, ...[iterator]];
          } else {
            failedData = [...failedData, iterator];
          }
        }
      }
      const csv_data = Papa.unparse(rawData);
      const LiveData = generateTableData(rawData);

      return { csv_data, LiveData, failedData };
    }
  } else if (supplier == "Sager") {
    if (!isCsv) {
      try {
        let rawData: any = [];
        let failedData: any = [];
        await Promise.all(
          partnumbers.map(async (keyword: string) => {
            const response = await axios.get(
              // `http://147.189.161.152/scrap_tdk/${keyword}`
              `http://147.189.161.152/scrap_sager/${keyword}`
            );
            if (response && response.data.status !== 404) {
              rawData = [...rawData, ...[response.data]];
            } else {
              failedData = [...failedData, keyword];
            }
          })
        );
        const csv_data = Papa.unparse(rawData);

        const LiveData = generateTableData(rawData);

        return { csv_data, LiveData, failedData };
      } catch (error) {
        throw new Error(`${error}`);
      }
    } else {
      let rawData: any = [];
      let failedData: any = [];
      const response = await axios.post(
        // `http://147.189.161.152/scrap_tdk_list`, { parts: partnumbers }
        `http://147.189.161.152/scrap_sager_list`,
        { parts: partnumbers }
      );
      console.log(response.data);
      if (response.data.length) {
        for (const iterator of response.data) {
          console.log(iterator);
          if (iterator && iterator.Results == "Found") {
            rawData = [...rawData, ...[iterator]];
          } else {
            failedData = [...failedData, iterator];
          }
        }
      }
      const csv_data = Papa.unparse(rawData);
      const LiveData = generateTableData(rawData);

      return { csv_data, LiveData, failedData };
    }
  }
}

interface LiveDataProps {
  type: string;
  supplier: string;
  partnumbers: string[];
  isCsv?: boolean;
}

export default async function GetLiveData({
  type,
  supplier,
  partnumbers,
  isCsv,
}: LiveDataProps) {
  console.log("before", partnumbers);
  const re = /^[0-9\b]+$/;
  var partnumbers = partnumbers.filter(function (el) {
    //return el != null && re.test(el);
    return el != null;
  });
  if (type.toLowerCase() === "manufacturer") {
    const response = await getLiveManufacturerData({
      supplier,
      partnumbers,
      isCsv,
    });

    return response;
  } else {
    const response = await getLiveDistributersData({
      supplier,
      partnumbers,
      isCsv,
    });
    return response;
  }
}
