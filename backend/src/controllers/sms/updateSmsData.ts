import SmsModel from "../../models/smsModel";

export async function updateSmsData(requestBody: {
  user_id: String;
  partner_app_package_name: String;
  payload: [
    {
      origin: String;
      content: String;
      timestamp: Number;
    }
  ];
}) {
  const smsModel = parseRequest(requestBody);
  const result = await SmsModel.insertMany(smsModel);
  console.log("many insert logs", result[0]);
  return result;
}

export function parseRequest(requestBody: {
  user_id: String;
  partner_app_package_name: String;
  payload: [
    {
      origin: String;
      content: String;
      timestamp: Number;
    }
  ];
}) {
  const sms = requestBody.payload.map((payload) => {
    return {
      user_id: `${requestBody.user_id}_of_${requestBody.partner_app_package_name}`,
      ...payload,
    };
  });

  console.log("sms  Model", sms);

  return sms;
}
