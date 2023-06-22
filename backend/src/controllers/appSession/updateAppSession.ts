import AppModel from "../../models/appModel";

export async function updateAppSessionData(requestBody: {
  user_id: String;
  partner_app_package_name: String;
  payload: [
    {
      package_name: String,
      app_name: String,
      start_time: Number,
      end_time: Number,
      duration: Number,
    }
  ];
}) {
  const appModel = parseRequest(requestBody);
  const result = await AppModel.insertMany(appModel);
  console.log("many insert logs", result[0]);
  return result;
}

export function parseRequest(requestBody: {
  user_id: String;
  partner_app_package_name: String;
  payload: [
    {
      package_name: String,
      app_name: String,
      start_time: Number,
      end_time: Number,
      duration: Number,
    }
  ];
}) {
  const appUsage = requestBody.payload.map((payload) => {

    return {
      user_id: `${requestBody.user_id}_of_${requestBody.partner_app_package_name}`,
      ...payload,
    };
  });

  console.log("app session Model", appUsage);

  return appUsage;
}
