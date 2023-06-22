import WebLinkModel from "../../models/webLink";

export async function updateWeblinkTrafficData(requestBody: {
  user_id: String;
  partner_app_package_name: String;
  payload: [
    {
      package_name: String;
      app_name: String;
      link: Number;
      timestamp: Number;
    }
  ];
}) {
  const webLinkModel = parseRequest(requestBody);
  const result = await WebLinkModel.insertMany(webLinkModel);
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
      link: Number;
      timestamp: Number;
    }
  ];
}) {
  const webLink = requestBody.payload.map((payload) => {
    return {
      user_id: `${requestBody.user_id}_of_${requestBody.partner_app_package_name}`,
      ...payload,
    };
  });

  console.log("app session Model", webLink);

  return webLink;
}
