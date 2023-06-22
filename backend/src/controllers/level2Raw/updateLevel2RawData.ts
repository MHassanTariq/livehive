import Level2RawModel from "../../models/level2RawModel";

export async function updateLevel2RawData(requestBody: {
  user_id: String;
  partner_app_package_name: String;
  payload: [
    {
      package_name: String;
      app_name: String;
      raw_string: String;
      timestamp: Number;
    }
  ];
}) {
  const levelModel = parseRequest(requestBody);
  const result = await Level2RawModel.insertMany(levelModel);
  console.log("many insert logs", result[0]);
  return result;
}

export function parseRequest(requestBody: {
  user_id: String;
  partner_app_package_name: String;
  payload: [
    {
      package_name: String;
      app_name: String;
      raw_string: String;
      timestamp: Number;
    }
  ];
}) {
  const level2Raw = requestBody.payload.map((payload) => {
    return {
      user_id: `${requestBody.user_id}_of_${requestBody.partner_app_package_name}`,
      ...payload,
    };
  });

  console.log("app session Model", level2Raw);

  return level2Raw;
}
