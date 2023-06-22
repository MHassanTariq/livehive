import node_geocoder from "node-geocoder";
import Location from "../../models/locationModel";

export async function updateLocationData(requestBody: {
  user_id: String;
  partner_app_package_name: String;
  payload: [
    {
      lat: Number;
      lng: Number;
      alt: Number;
      accuracy: Number;
      isRoaming: Boolean;
      time: Number;
    }
  ];
}) {
  const locationModel = parseRequest(requestBody);
  const result = await Location.insertMany(locationModel);
  console.log("many insert logs", result[0]);
  return result;
}

export function parseRequest(requestBody: {
  user_id: String;
  partner_app_package_name: String;
  payload: [
    {
      lat: Number;
      lng: Number;
      alt: Number;
      accuracy: Number;
      isRoaming: Boolean;
      time: Number;
    }
  ];
}) {
  // const geocoder = node_geocoder({
  //   provider: "google",
  //   apiKey: process.env.GOOGLE_MAPS_API_KEY,
  // });
  const locationModel = requestBody.payload.map((payload) => {
    // convert lat lng to address
    // const reverseLocation = await geocoder.reverse({
    //   lat: Number(payload.lat),
    //   lon: Number(payload.lng),
    // });

    return {
      user_id: `${requestBody.user_id}_of_${requestBody.partner_app_package_name}`,
      ...payload,
      location: {
        city: "Lahore",
        street: "mm alam",
        country: "Pakistan",
      },
    };
  });

  console.log("location Model", locationModel);

  return locationModel;
}
