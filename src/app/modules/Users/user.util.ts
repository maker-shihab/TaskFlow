import crypto from "crypto";

export const generateRandomId = async (prefix: string) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  const currentDate = String(new Date().getDate());

  const uniqueNumber = crypto.randomBytes(3).toString("hex");

  return `${prefix}${currentYear}${currentMonth}${currentDate}${uniqueNumber}`;
};
