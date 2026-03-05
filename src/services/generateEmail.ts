import { loadServerMessages } from "../../messages/server";

type ServerMessages = Awaited<ReturnType<typeof loadServerMessages>>;

export interface EmailData {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	message: string;
	date: string;
	time: string;
  timeFinish: string;
  eventName: string;

}

function interpolate(template: string, values: Record<string, string>) {
	return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

export function generatePlainTextEmail(locale: string, greetingName: string, data: EmailData, userZoomLink: string, managementUrl: string, messages: ServerMessages): string {
	return `${interpolate(messages.server.email.hi, { name: greetingName })}

${messages.server.email.thanks}
${interpolate(messages.server.email.seeYou, { date: data.date, time: data.time })} JST

${messages.server.email.serviceBooked}: ${messages.server.email.serviceName}
${messages.server.email.staff}: ${messages.server.email.staffName}
${messages.server.email.platform}: ${messages.server.email.platformValue}
${messages.server.email.dateTimeLabel}: ${data.date} ${data.time}

Zoom link: ${userZoomLink || ""}
${messages.server.email.rescheduleText}: ${managementUrl}

${messages.server.email.calendar.addToCalendar}
Google Calendar: ${generateGoogleCalendarUrl(data.date, data.time)}
Outlook / Teams: ${generateOutlookUrl(data.date, data.time)}

${messages.server.email.contact}
Email: ${messages.server.email.supportEmail}

${messages.server.email.footerWebsite}: ${locale === "ja" ? "https://j-globalbizschool.com/" : "https://j-globalbizschool.com/en/"}
${messages.server.email.footerPrivacy}: ${locale === "ja" ? "https://j-globalbizschool.com/privacy-policy/" : "https://j-globalbizschool.com/en/privacy-policy/"}`;
}

export function generateHTMLEmail(locale: string, htmlGreetingName: string, data: EmailData, userZoomLink: string, managementUrl: string, messages: ServerMessages): string {
	const calendarUrl = generateGoogleCalendarUrl(data.date, data.time);
	const outlookUrl = generateOutlookUrl(data.date, data.time);

	return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="${locale}">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background-color:#f8fafc; font-family:Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8fafc; padding:40px 0;">
    <tr>
      <td align="center">
        <table width="540" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff; border-radius:16px; border:1px solid #e2e8f0; box-shadow:0 10px 15px -3px rgba(0,0,0,0.04); overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="padding:48px;">
              <span style="display:inline-block; background-color:#f0f7ff; color:#1e40af; font-size:11px; font-weight:700; padding:4px 10px; border-radius:6px; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:20px;">
                ${messages.server.email.badge}
              </span>
              <h1 style="margin:0; font-size:24px; font-weight:800; color:#0f172a; line-height:1.2;">
                ${messages.server.email.header}
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:0 48px 48px 48px; font-size:15px; line-height:1.6; color:#475569;">
              ${interpolate(messages.server.email.hi, { name: htmlGreetingName })}<br><br>
              ${messages.server.email.thanks}<br>
              ${interpolate(messages.server.email.seeYou, { date: data.date, time: data.time })}

              <!-- Detail Card -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8fafc; border-radius:12px; padding:24px; margin:20px 0; border:1px solid #f1f5f9;">
                <tr>
                  <td style="font-size:11px; font-weight:600; color:#94a3b8; text-transform:uppercase; letter-spacing:0.05em; padding-bottom:4px;">${messages.server.email.serviceBooked}</td>
                  <td style="font-size:15px; font-weight:600; color:#1e293b;">${messages.server.email.serviceName}</td>
                </tr>
                <tr>
                  <td style="font-size:11px; font-weight:600; color:#94a3b8; text-transform:uppercase; letter-spacing:0.05em; padding-top:8px; padding-bottom:4px;">${messages.server.email.staff}</td>
                  <td style="font-size:15px; font-weight:600; color:#1e293b;">${messages.server.email.staffName}</td>
                </tr>
                <tr>
                  <td style="font-size:11px; font-weight:600; color:#94a3b8; text-transform:uppercase; letter-spacing:0.05em; padding-top:8px; padding-bottom:4px;">${messages.server.email.platform}</td>
                  <td style="font-size:15px; font-weight:600; color:#1e293b;">${messages.server.email.platformValue}</td>
                </tr>
                <tr>
                  <td style="font-size:11px; font-weight:600; color:#94a3b8; text-transform:uppercase; letter-spacing:0.05em; padding-top:8px; padding-bottom:4px;">${messages.server.email.dateTimeLabel}</td>
                  <td style="font-size:15px; font-weight:600; color:#1e293b;">${data.date} ${data.time} JST</td>
                </tr>
              </table>

              <!-- Zoom Button -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0; padding:0;">
                <tr>
                  <td align="center" style="padding:20px 0;">
                    <a href="${userZoomLink || ""}"
                       style="display:inline-block; background-color:#0f172a; color:#ffffff !important; text-decoration:none !important; padding:13px 24px; border-radius:10px; font-weight:600; font-size:15px;">
                       ${messages.server.email.zoomLink}
                    </a>
                  </td>
                </tr>
              </table>

              <a href="${managementUrl}" style="display:block; text-align:center; margin-top:24px; font-size:13px; color:#64748b; text-decoration:none; font-weight:500; border-bottom:1px solid transparent;">
                ${messages.server.email.rescheduleText}
              </a>

              <!-- Instructions -->
              <div style="font-size:13px; line-height:1.6; color:#64748b; margin-top:32px; padding-top:24px; border-top:1px solid #f1f5f9;">
                ${messages.server.email.contact.split("\\n")[0]}<br>
                <a href="mailto:${messages.server.email.supportEmail}" style="color:#1e40af; text-decoration:none; font-weight:600;">
                  ${messages.server.email.supportEmail}
                </a>
              </div>

              <!-- Calendar links -->
              <div style="margin-top:32px; text-align:center;">
                <a href="${calendarUrl}" style="font-size:12px; color:#0f172a; text-decoration:none; font-weight:700; margin:0 6px;">${messages.server.email.calendar.google}</a>
                <a href="${outlookUrl}" style="font-size:12px; color:#0f172a; text-decoration:none; font-weight:700; margin:0 6px;">${messages.server.email.calendar.outlook}</a>
              </div>

            </td>
          </tr>
        </table>

        <!-- Footer -->
        <table width="540" cellpadding="0" cellspacing="0" border="0" style="margin:40px auto; text-align:center; font-family:Arial, sans-serif; font-size:12px; color:#666;">
          <tr>
            <td>
              <img src="https://j-globalbizschool.com/images/logo.png" alt="j-globalbizschool.com" style="max-width:120px; margin-bottom:24px; opacity:0.9; display:block; margin-left:auto; margin-right:auto;">
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:10px;">
              <a href="${locale === "ja" ? "https://j-globalbizschool.com/" : "https://j-globalbizschool.com/en/"}" style="color:#1a73e8; text-decoration:none; margin-right:15px;">${messages.server.email.footerWebsite}</a>
              <a href="${locale === "ja" ? "https://j-globalbizschool.com/privacy-policy/" : "https://j-globalbizschool.com/en/privacy-policy/"}" style="color:#1a73e8; text-decoration:none;">${messages.server.email.footerPrivacy}</a>
            </td>
          </tr>
          <tr>
            <td style="font-size:11px; color:#cbd5e1; line-height:1.6;">
              &copy; 2026 J-Global Bussiness School <br>
              ${messages.server.email.footerCopyright}
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
}

export function generateLecturerNotificationHTML(data: EmailData, messages: ServerMessages): string {
	const phoneRow = data.phone.trim() ? `<div class="row"><span class="label">Phone Number:</span><span class="value">${data.phone}</span></div>` : "";

	const messageRow = data.message.trim() ? `<div class="row"><span class="label">Message:</span><span class="value">${data.message}</span></div>` : "";

	return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  body { margin:0; padding:0; background-color:#f8fafc; font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',Roboto,Helvetica,Arial,sans-serif; -webkit-font-smoothing:antialiased; }
  .wrapper { width:100%; table-layout:fixed; padding:40px 0; background-color:#f8fafc; }
  .container { max-width:540px; margin:0 auto; background-color:#fff; border-radius:16px; border:1px solid #e2e8f0; box-shadow:0 10px 15px -3px rgba(0,0,0,0.04); overflow:hidden; }
  .header { padding:32px 32px 24px 32px; text-align:center; }
  h2 { margin:0; font-size:20px; font-weight:700; color:#0f172a; }
  .content { padding:0 32px 32px 32px; font-size:15px; color:#475569; line-height:1.6; }
  .detail-card { background-color:#f8fafc; border-radius:12px; padding:20px; border:1px solid #f1f5f9; margin-top:20px; }
  .row { margin-bottom:12px; }
  .label { font-weight:600; color:#94a3b8; margin-right:6px; text-transform:uppercase; font-size:12px; }
  .value { font-weight:500; color:#1e293b; }
  @media screen and (max-width:600px) {
    .wrapper { padding:20px 0; }
    .header, .content { padding:24px; }
  }
</style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h2>New Free Coaching Session Booking</h2>
      </div>

      <div class="content">
        <p>A new user has booked a free coaching session.</p>

        <div class="detail-card">
          <div class="row"><span class="label">Name:</span><span class="value">${data.firstName} ${data.lastName}</span></div>
          <div class="row"><span class="label">Email:</span><span class="value">${data.email}</span></div>
          ${phoneRow}
          ${messageRow}
          <div class="row"><span class="label">Date:</span><span class="value">${data.date}</span></div>
          <div class="row"><span class="label">Time:</span><span class="value">${data.time} (JST)</span></div>
        </div>

        <p style="margin-top:24px;">You can find the event details and the Zoom link in the calendar event description.</p>
        <p>— Booking Notification System</p>
      </div>
    </div>
  </div>
</body>
</html>
`;
}

export function generateICS({ start, end, title, description, location }: { start: Date; end: Date; title: string; description: string; location: string }): string {
	const formatICSDate = (d: Date) => d.toISOString().replace(/-|:|\.\d{3}/g, "") + "Z";
	return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//J Global Biz School//Coaching Session//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", "BEGIN:VEVENT", `UID:${crypto.randomUUID()}@j-globalbizschool.com`, `DTSTAMP:${formatICSDate(new Date())}`, `DTSTART:${formatICSDate(start)}`, `DTEND:${formatICSDate(end)}`, `SUMMARY:${title}`, `DESCRIPTION:${description}`, `LOCATION:${location}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
}

export function generateICSWorkshop({ 
  start, 
  end, 
  title, 
  description, 
  location, 
  url 
}: { 
  start: Date; 
  end: Date; 
  title: string; 
  description: string; 
  location: string;
  url?: string;
}): string {
  
  // Safe formatter: Removes all non-alphanumeric characters from ISO string
  // Example: 2024-05-20T19:00:00.000Z -> 20240520T190000Z
  const formatICSDate = (d: Date) => {
    if (!d || isNaN(d.getTime())) return "";
    return d.toISOString().split('.')[0].replace(/[:/-]/g, "") + "Z";
  };

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//J Global Biz School//Workshop//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${crypto.randomUUID()}@j-globalbizschool.com`,
    `DTSTAMP:${formatICSDate(new Date())}`,
    `DTSTART:${formatICSDate(start)}`,
    `DTEND:${formatICSDate(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}${url ? `\\n\\nJoin Zoom: ${url}` : ""}`,
    `LOCATION:${location}`,
    `URL;VALUE=URI:${url || ""}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT15M",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR"
  ];

  return lines.join("\r\n");
}

function generateGoogleCalendarUrl(date: string, time: string): string {
	const start = new Date(`${date}T${time}:00+09:00`);
	const end = new Date(start.getTime() + 30 * 60 * 1000);
	const formatForGoogle = (d: Date) => d.toISOString().replace(/-|:|\.\d{3}/g, "");

	return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Free+Coaching+Session&dates=${formatForGoogle(start)}/${formatForGoogle(end)}&details=Your+free+coaching+session&location=Online`;
}



function generateOutlookUrl(date: string, time: string): string {
	const start = new Date(`${date}T${time}:00+09:00`);
	const end = new Date(start.getTime() + 30 * 60 * 1000);

	return `https://outlook.office.com/calendar/0/deeplink/compose?subject=Free+Coaching+Session&startdt=${start.toISOString()}&enddt=${end.toISOString()}&body=Your+free+coaching+session&location=Online`;
}

export function generateRescheduleHTMLEmail(locale: string, firstName: string, lastName: string, oldEventDate: Date, newStart: Date, newEnd: Date, userZoomLink: string, managementUrl: string, messages: ServerMessages): string {
	const calendarUrl = generateGoogleCalendarUrl(newStart.toISOString().split("T")[0], newStart.toISOString().split("T")[1].substring(0, 5));
	const outlookUrl = generateOutlookUrl(newStart.toISOString().split("T")[0], newStart.toISOString().split("T")[1].substring(0, 5));

	const greetingName = locale === "ja" ? lastName : firstName;

	return `
<!DOCTYPE html>
<html lang="${locale}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background-color:#f8fafc; font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',Roboto,Helvetica,Arial,sans-serif; -webkit-font-smoothing:antialiased;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:40px 0; background-color:#f8fafc;">
  <tr>
    <td align="center">
      <table width="540" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff; border-radius:16px; border:1px solid #e2e8f0; box-shadow:0 10px 15px -3px rgba(0,0,0,0.04); overflow:hidden;">
        
        <tr>
          <td style="padding:48px; text-align:center;">
            <h1 style="margin:0; font-size:24px; font-weight:800; color:#0f172a;">${messages.server.email.rescheduledHeader}</h1>
          </td>
        </tr>

        <tr>
          <td style="padding:0 48px 48px 48px; font-size:15px; line-height:1.6; color:#475569;">
            <p>${interpolate(messages.server.email.hi, { name: greetingName })}</p>
            <p>${messages.server.email.rescheduledIntro}</p>

            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8fafc; border-radius:12px; padding:24px; margin:20px 0; border:1px solid #f1f5f9;">
              <tr>
                <td style="font-weight:600; color:#94a3b8; text-transform:uppercase; font-size:12px; padding-bottom:4px;">${messages.server.email.originalDate}</td>
                <td style="font-weight:600; color:#1e293b; font-size:15px;">${oldEventDate.toLocaleString("en-US", { timeZone: "Asia/Tokyo", dateStyle: "full", timeStyle: "short" })} JST</td>
              </tr>
              <tr>
                <td style="font-weight:600; color:#94a3b8; text-transform:uppercase; font-size:12px; padding-top:8px; padding-bottom:4px;">${messages.server.email.newDate}</td>
                <td style="font-weight:600; color:#1e293b; font-size:15px;">${newStart.toLocaleString("en-US", { timeZone: "Asia/Tokyo", dateStyle: "full", timeStyle: "short" })} JST</td>
              </tr>
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0;">
              <tr>
                <td align="center">
                  <a href="${userZoomLink}" style="display:inline-block; background-color:#0f172a; color:#ffffff !important; text-decoration:none !important; padding:13px 24px; border-radius:10px; font-weight:600; font-size:15px;">
                    ${messages.server.email.zoomLink}
                  </a>
                </td>
              </tr>
            </table>

            <p style="text-align:center; margin-top:12px; font-size:13px; color:#64748b;">
              <a href="${managementUrl}" style="text-decoration:none; color:#64748b; font-weight:500; border-bottom:1px solid transparent;">${messages.server.email.changeBooking}</a>
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:32px;">
              <tr>
                <td align="center">
                  <a href="${calendarUrl}" style="font-size:12px; color:#0f172a; text-decoration:none; font-weight:700; margin:0 6px;">${messages.server.email.calendar.google}</a>
                  <a href="${outlookUrl}" style="font-size:12px; color:#0f172a; text-decoration:none; font-weight:700; margin:0 6px;">${messages.server.email.calendar.outlook}</a>
                </td>
              </tr>
            </table>

            <p style="margin-top:32px; font-size:14px; color:#666;">
              ${messages.server.email.contact} 
              <a href="mailto:${messages.server.email.supportEmail}" style="color:#2563eb; text-decoration:none;">${messages.server.email.supportEmail}</a>
            </p>

            <p style="margin-top:32px;">— ${messages.server.email.teamName}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>

</body>
</html>
`;
}

export function generateCancelHTMLEmail(locale: string, firstName: string, lastName: string, eventDate: Date, messages: ServerMessages): string {
	const greetingName = locale === "ja" ? lastName : firstName;

	return `
<!DOCTYPE html>
<html lang="${locale}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background-color:#f8fafc; font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',Roboto,Helvetica,Arial,sans-serif; -webkit-font-smoothing:antialiased;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:40px 0; background-color:#f8fafc;">
<tr><td align="center">
<table width="540" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff; border-radius:16px; border:1px solid #e2e8f0; box-shadow:0 10px 15px -3px rgba(0,0,0,0.04); overflow:hidden;">
<tr><td style="padding:48px; text-align:center;">
<h1 style="margin:0; font-size:24px; font-weight:800; color:#0f172a;">${messages.server.email.cancelledHeader}</h1>
</td></tr>
<tr><td style="padding:0 48px 48px 48px; font-size:15px; line-height:1.6; color:#475569;">
<p>${interpolate(messages.server.email.hi, { name: greetingName })}</p>
<p>${messages.server.email.cancelledIntro}</p>
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8fafc; border-radius:12px; padding:24px; margin:20px 0; border:1px solid #f1f5f9;">
<tr>
<td style="font-size:11px; font-weight:600; color:#94a3b8; text-transform:uppercase; letter-spacing:0.05em; padding-bottom:4px;">${messages.server.email.serviceBooked}</td>
<td style="font-size:15px; font-weight:600; color:#1e293b;">${messages.server.email.serviceName}</td>
</tr>
<tr>
<td style="font-size:11px; font-weight:600; color:#94a3b8; text-transform:uppercase; letter-spacing:0.05em; padding-top:8px; padding-bottom:4px;">${messages.server.email.staff}</td>
<td style="font-size:15px; font-weight:600; color:#1e293b;">${messages.server.email.staffName}</td>
</tr>
<tr>
<td style="font-size:11px; font-weight:600; color:#94a3b8; text-transform:uppercase; letter-spacing:0.05em; padding-top:8px; padding-bottom:4px;">${messages.server.email.platform}</td>
<td style="font-size:15px; font-weight:600; color:#1e293b;">${messages.server.email.platformValue}</td>
</tr>
<tr>
<td style="font-size:11px; font-weight:600; color:#94a3b8; text-transform:uppercase; letter-spacing:0.05em; padding-top:8px; padding-bottom:4px;">${messages.server.email.dateTimeLabel}</td>
<td style="font-size:15px; font-weight:600; color:#1e293b;">${eventDate.toLocaleString(locale === "ja" ? "ja-JP" : "en-US", { timeZone: "Asia/Tokyo", dateStyle: "long", timeStyle: "short" })} JST</td>
</tr>
</table>
<p>${messages.server.email.cancelledAction}</p>
<p style="margin-top:32px; font-size:13px; line-height:1.6; color:#64748b;">
<a href="mailto:${messages.server.email.supportEmail}" style="color:#1e40af; font-weight:600; text-decoration:none;">${messages.server.email.supportEmail}</a>
</p>
<p style="margin-top:32px;">— ${messages.server.email.teamName}</p>
</td></tr>
</table>
</td></tr></table>
</body>
</html>
`;
}

export function generateLecturerRescheduleNotificationHTML(firstName: string, lastName: string, oldEventDate: Date, newEventDate: Date): string {
	return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background-color:#f8fafc; font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:40px 0; background-color:#f8fafc;">
<tr><td align="center">
<table width="540" cellpadding="0" cellspacing="0" border="0" style="background-color:#fff; border-radius:16px; border:1px solid #e2e8f0; box-shadow:0 10px 15px -3px rgba(0,0,0,0.04);">
<tr><td style="padding:32px; text-align:center;">
<h2 style="margin:0; font-size:20px; font-weight:700; color:#0f172a;">Coaching Session Rescheduled</h2>
</td></tr>
<tr><td style="padding:0 32px 32px 32px; font-size:15px; color:#475569; line-height:1.6;">
<p>A user has rescheduled their coaching session.</p>
<div style="background-color:#f8fafc; border-radius:12px; padding:20px; border:1px solid #f1f5f9; margin-top:20px;">
<div style="margin-bottom:12px;"><span style="font-weight:600; color:#94a3b8; font-size:12px; text-transform:uppercase;">Name:</span> <span style="color:#1e293b;">${firstName} ${lastName}</span></div>
<div style="margin-bottom:12px;"><span style="font-weight:600; color:#94a3b8; font-size:12px; text-transform:uppercase;">Original Date:</span> <span style="color:#1e293b;">${oldEventDate.toLocaleString("en-US", { timeZone: "Asia/Tokyo", dateStyle: "long", timeStyle: "short" })} JST</span></div>
<div><span style="font-weight:600; color:#94a3b8; font-size:12px; text-transform:uppercase;">New Date:</span> <span style="color:#1e293b;">${newEventDate.toLocaleString("en-US", { timeZone: "Asia/Tokyo", dateStyle: "long", timeStyle: "short" })} JST</span></div>
</div>
<p style="margin-top:24px;">— Booking Notification System</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>
`;
}

export function generateLecturerCancelNotificationHTML(firstName: string, lastName: string, email: string, eventDate: Date): string {
	return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body>
A coaching session has been cancelled.
<p>Name: ${firstName} ${lastName}</p>
<p>Email: ${email}</p>
<p>Date: ${eventDate.toLocaleString("en-US", { timeZone: "Asia/Tokyo", dateStyle: "long", timeStyle: "short" })} JST</p>
</body>
</html>
`;
}

/**
 * CONTACT NOTIFICATION - HTML for Lecturer
 */
export function generateContactNotificationHTML(params: { messageId: string; sessionId: string; firstName: string; lastName: string; email: string; safeMessage: string }): string {
	return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background-color:#f8fafc; font-family:Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8fafc; padding:40px 0;">
    <tr>
      <td align="center">
        <table width="540" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff; border-radius:16px; border:1px solid #e2e8f0; box-shadow:0 10px 15px -3px rgba(0,0,0,0.04); overflow:hidden;">
          <tr>
            <td style="padding:40px;">
              <h2 style="margin:0 0 20px 0; font-size:20px; font-weight:800; color:#2563eb; line-height:1.2;">
                New Contact Message
              </h2>

              <div style="font-size:15px; line-height:1.6; color:#333;">
                <p style="margin: 0 0 10px 0;"><strong>Message ID:</strong> ${params.messageId}</p>
                <p style="margin: 0 0 10px 0;"><strong>Session ID:</strong> ${params.sessionId}</p>
                <p style="margin: 0 0 10px 0;"><strong>First Name:</strong> ${params.firstName}</p>
                <p style="margin: 0 0 10px 0;"><strong>Last Name:</strong> ${params.lastName}</p>
                <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${params.email}</p>
                
                <div style="margin-top: 20px; padding: 20px; background-color: #f8fafc; border-radius: 12px; border: 1px solid #f1f5f9;">
                  <strong style="display: block; margin-bottom: 8px; color: #64748b; font-size: 12px; text-transform: uppercase;">Message:</strong>
                  <div style="color: #1e293b;">${params.safeMessage}</div>
                </div>

                <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
                
                <p style="margin:0; font-size:13px; color:#666; text-align: center;">
                  — Contact Notification System
                </p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
}


/**
 * HELPER: Fixes MM/DD/YYYY to YYYY-MM-DD for Date constructor
 */
const toISODate = (dateStr: string) => {
  const p = dateStr.split('/');
  return p.length === 3 ? `${p[2]}-${p[0]}-${p[1]}` : dateStr;
};

/**
 * WORKSHOP - Plain Text Email
 */
export function generateWorkshopPlainTextEmail(
  locale: string, 
  data: EmailData, 
  programCode: string,
  userZoomLink: string, 
  messages: ServerMessages
): string {
  const isJa = locale === "ja";
  
  // 1. Localized Date Logic (Matching HTML)
  const [part1, part2, part3] = data.date.split(/[/-]/);
  const month = part1;
  const day = part2;
  const year = part3;
  const localizedDate = isJa 
    ? `${year}年${month}月${day}日` 
    : `${month}/${day}/${year}`;

  // 2. Localized Greeting Logic
  const greetingName = isJa ? data.lastName : data.firstName;
  const hiText = isJa ? `こんにちは、${greetingName}さん。` : `Hi ${greetingName},`;

  // 3. Calendar URL
  const calendarUrl = generateGoogleCalendarUrlWorkshop(
    data.date, 
    data.time, 
    data.timeFinish, 
    `${data.eventName} (${programCode})`
  );

  // 4. Construct Content
  const welcomeText = isJa 
    ? "J-Globalのビジネススクールへようこそ。私たちはあなたの目標達成の一端を担えることを光栄に思います。\n\nJ-Globalは、変化の激しい現代のビジネス環境で競争力を高めるために、実践的なスキルを身につける機会を提供しています。" 
    : "Welcome to J-Global's Business School. We are honored to be part of your personal development goals. We understand the need to develop one's skills to be competitive in today’s job market.";

  const enrollmentText = isJa 
    ? "以下のワークショップにご登録いただきました。" 
    : "You have enrolled in the following workshop:";

  const footerAbout = isJa
    ? "現役のビジネスコーチが教えるMini MBAや、世界に通用するプレゼンテーション方法、グローバルなマーケティング方法などグローバルビジネスプログラムをビジネス英語と同時にオンラインで学びます。"
    : "Build intercultural leadership and communication skills for diverse roles in Japan. Choose from programs that strengthen your competencies and advance your career.";

  return `
${isJa ? 'J-Globalのビジネススクールプログラムへようこそ' : "Welcome to J-Global's Business School"}

${hiText}

${welcomeText}

${enrollmentText}
--------------------------------------------------
1. ${data.eventName} (${programCode})
${isJa ? '日程' : 'Schedule'}: ${localizedDate} (${data.time} JST)

Zoom Link: ${userZoomLink}
Google Calendar: ${calendarUrl}
--------------------------------------------------

${isJa ? 'J-Globalのビジネススクールを見る' : "Visit our website"}:
https://j-globalbizschool.com/${locale}

${footerAbout}

${isJa ? 'ご不明点やキャンセル等につきましては、 support@j-global.com までご連絡ください。' : 'For general assistance or to cancel your order, contact support@j-global.com'}

J-Global, Inc. 株式会社J-グローバル
Office: 1-3-9 Uehara, Shibuya-ku, Tokyo 151-0064
Call: +81 (0)3-6744-4763 | Email: support@j-global.com
Copyright © j-globalbizschool All Rights Reserved.
`;
}

/**
 * WORKSHOP - HTML Email
 */
export function generateWorkshopHTMLEmail(
  locale: string, 
  data: EmailData, 
  programCode: string,
  userZoomLink: string, 
  messages: ServerMessages
): string {
  const isJa = locale === "ja";
  const calendarUrl = generateGoogleCalendarUrlWorkshop(data.date, data.time, data.timeFinish, (data.eventName + " (" + programCode + ")"));
// Split the string by / or -
const [part1, part2, part3] = data.date.split(/[/-]/);

// Since your input is 03/05/2026 (MM/DD/YYYY):
const month = part1;
const day = part2;
const year = part3;

// Construct the localized strings
const localizedDate = isJa 
  ? `${year}年${month}月${day}日` 
  : `${month}/${day}/${year}`;
  // Localized Greeting: Last Name for JA, First Name for EN
  const greetingName = isJa ? data.lastName : data.firstName;
  const hiText = isJa ? `こんにちは、${greetingName}さん。` : `Hi ${greetingName},`;

  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="${locale}">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background-color:#f4f7f9; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333333;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f7f9; padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          
          <tr>
            <td style="padding:40px 40px 20px 40px; text-align:left; border-bottom: 1px solid #eeeeee;">
               <h2 style="margin:0; color:#0f172a; font-size:20px;">
                ${isJa ? 'J-Globalのビジネススクールプログラムへようこそ' : "Welcome to J-Global's Business School"}
               </h2>
            </td>
          </tr>

          <tr>
            <td style="padding:40px; font-size:15px; line-height:1.6;">
              <p style="font-size:17px; font-weight:bold; margin-top:0;">${hiText}</p>
              
              <p>${isJa 
                ? "J-Globalのビジネススクールへようこそ。私たちはあなたの目標達成の一端を担えることを光栄に思います。<br><br>J-Globalは、変化の激しい現代のビジネス環境で競争力を高めるために、実践的なスキルを身につける機会を提供しています。" 
                : "Welcome to J-Global's Business School. We are honored to be part of your personal development goals. We understand the need to develop one's skills to be competitive in today’s job market."
              }</p>

<p style="font-weight:bold; margin-top:25px;">
  ${isJa 
    ? "以下のワークショップにご登録いただきました。" 
    : "You have enrolled in the following workshop:"}
</p>              
              <div style="background-color:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:20px; margin:15px 0;">
                <p style="margin:0;"><strong>1.${data.eventName} (${programCode})</strong></p>
                <p style="margin:5px 0 0 0;">${isJa ? '日程' : 'Schedule'}: ${localizedDate} : (${data.time} JST)</p>
                
                <div style="margin-top:15px;">
                  <a href="${userZoomLink}" style="color:#2563eb; font-weight:bold; text-decoration:underline;">${isJa ? 'Zoomリンクはこちら' : 'Join Zoom Meeting'}</a>
                  <span style="margin: 0 10px; color:#cbd5e1;">|</span>
<a href="${calendarUrl}" style="color:#475569; font-size:13px; text-decoration:none;">📅 ${isJa ? 'Googleカレンダーに追加' : 'Add to Google Calendar'}</a>                </div>
              </div>



              <hr style="border:none; border-top:1px solid #eeeeee; margin:30px 0;" />

            
              <div style="text-align:center; margin:20px 0;">
                <a href="https://j-globalbizschool.com/${locale}" style="color:#2563eb; font-weight:bold; text-decoration:none;">
                   ${isJa ? 'J-Globalのビジネススクールについて' : "About J-Global's Business School"}
                </a>
              </div>

               <p style="font-size:13px; color:#7b8087; margin-top:40px; text-align:center;">
                ${isJa ? '現役のビジネスコーチが教えるMini MBAや、世界に通用するプレゼンテーション方法、グローバルなマーケティング方法などグローバルビジネスプログラムをビジネス英語と同時にオンラインで学びます。' : "Build intercultural leadership and communication skills for diverse roles in Japan. Choose from programs that strengthen your competencies and advance your career in both foreign and Japanese organizations."}
               </p>

               <div style="text-align:center; margin:30px 0;">
                <a href="https://j-globalbizschool.com/${locale}" style="display:inline-block; background-color:#0f172a; color:#ffffff !important; text-decoration:none !important; padding:13px 24px; border-radius:10px; font-weight:600; font-size:15px;">
                  ${isJa ? 'J-Globalのビジネススクールを見る' : "Visit our website"}
                </a>
              </div>



              <p style="font-size:13px; color:#94a3b8; margin-top:40px;">
                ${isJa ? 'ご不明点やキャンセル等につきましては、 support@j-global.com までご連絡ください。' : 'For general assistance or to cancel your order, contact support@j-global.com'}
              </p>
            </td>
          </tr>

          <tr>
            <td style="background-color:#1e293b; padding:40px; color:#ffffff; font-size:12px; line-height:1.8;">
              <p style="margin:0; font-weight:bold;">J-Global, Inc. 株式会社J-グローバル</p>
              <p style="margin:0;">Office: 1-3-9 Uehara, Shibuya-ku, Tokyo 151-0064</p>
              <p style="margin:0;">Call: +81 (0)3-6744-4763 | Email: support@j-global.com</p>
              <p style="margin:20px 0 0 0; color:#94a3b8;">
                Copyright © j-globalbizschool All Rights Reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;
}
/**
 * FIXED Google Calendar Link Generator
 */
export function generateGoogleCalendarUrlWorkshop(
  date: string,      // "03/05/2026"
  startTime: string, // "20:00"
  endTime: string,   // "21:15"
  title: string = "Workshop Registration"
) {
  try {
    const isoDate = toISODate(date); // Your utility converting to "2026-03-05"

    // Create Date objects for both Start and End
    const start = new Date(`${isoDate}T${startTime}:00+09:00`);
    const end = new Date(`${isoDate}T${endTime}:00+09:00`);

    console.log("Start Date Object:", start);
    console.log("End Date Object:", end);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error("Invalid date or time provided");
    }

    // Google Calendar format: YYYYMMDDTHHMMSSZ (UTC)
    const formatForGoogle = (d: Date) => d.toISOString().replace(/-|:|\.\d{3}/g, "");

    const encodedTitle = encodeURIComponent(title);
    console.log("Encoded Title:", encodedTitle);
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&dates=${formatForGoogle(start)}/${formatForGoogle(end)}&location=Zoom+Online`;
  } catch (e) {
    console.error("Google Calendar Link Error:", e);
    return "#";
  }
}