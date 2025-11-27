export function eventEmailTemplate(
  name,
  amount,
  image,
  userId,
  event_name,
  email,
  group_name,
  date,
  time,
) {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html dir="ltr" lang="en">
    <head>
      <meta content="width=device-width" name="viewport" />
      <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta content="IE=edge" http-equiv="X-UA-Compatible" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta
        content="telephone=no,address=no,email=no,date=no,url=no"
        name="format-detection" />
    </head>
    <body>
      <!--$--><!--html--><!--head-->
      <div
        style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"
        data-skip-in-text="true">
        Here&#x27;s your booking summary
        <div>
           ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
        </div>
      </div>
      <!--body-->
      <table
        border="0"
        width="100%"
        cellpadding="0"
        cellspacing="0"
        role="presentation"
        align="center">
        <tbody>
          <tr>
            <td>
              <table
                align="center"
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-size:1.0769230769230769em;min-height:100%;line-height:155%">
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="left"
                        width="100%"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        style="align:left;width:100%;padding-left:0px;padding-right:0px;line-height:155%;max-width:600px;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif">
                        <tbody>
                          <tr>
                            <td>
                              <h2
                                class="node-heading"
                                style="margin:0;padding:0;font-size:1.8em;line-height:1.44em;padding-top:0.389em;font-weight:600">
                                <span>Thank you for choosing us 💕</span>
                              </h2>
                              <p
                                class="node-paragraph"
                                style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                <span
                                  >We have successfully received your booking
                                  request with the </span
                                >${name}<span> and credited </span
                                >${amount}<span>
                                  . Your booking includes following details
                                  provided below.</span
                                >
                              </p>
                              <p
                                style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                <br />
                              </p>
                              <div>

                                <img
                                  src="${image}"
                                  width="250"
                                  height="auto"
                                  style="width: 250px; height: auto; display: block;"
                                  alt="Description of your image"
                                />
                              </div>
                              <hr
                                class="divider"
                                style="width:100%;border:none;border-top:1px solid #eaeaea;padding-bottom:1em;border-width:2px" />
                              <h1
                                class="node-heading"
                                style="margin:0;padding:0;font-size:2.25em;line-height:1.44em;padding-top:0.389em;font-weight:600">
                                <span>Invoice #</span>${userId}
                              </h1>
                              <p
                                class="node-paragraph"
                                style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                <span>Biva Hotels and Bakery</span>
                              </p>
                              <p
                                class="node-paragraph"
                                style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                <span>Silchar, Assam, India, 788004</span>
                              </p>
                              <table
                                width="100%"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                class="node-section"
                                style="padding:10px 20px 10px 20px;box-sizing:border-box;background-color:rgb(197, 217, 229);border-bottom-left-radius:8px;border-bottom-right-radius:8px;border-radius:8px;border-top-left-radius:8px;border-top-right-radius:8px">
                                <tbody>
                                  <tr>
                                    <td>
                                      <p
                                        class="node-paragraph"
                                        style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                        <span><strong>Name: </strong></span
                                        >${name}
                                      </p>
                                      <hr
                                        class="node-divider divider"
                                        style="width:100%;border:none;border-top:1px solid #eaeaea;padding-bottom:1em;border-width:2px" />
                                      <p
                                        class="node-paragraph"
                                        style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                        <span><strong>Email: </strong></span
                                        >${email}
                                      </p>
                                      <hr
                                        class="node-divider divider"
                                        style="width:100%;border:none;border-top:1px solid #eaeaea;padding-bottom:1em;border-width:2px" />
                                      <p
                                        style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                        <span><strong>Event Name:</strong></span
                                        ><span> </span>${event_name}
                                      </p>
                                      <hr
                                        class="node-divider divider"
                                        style="width:100%;border:none;border-top:1px solid #eaeaea;padding-bottom:1em;border-width:2px" />
                                      <p
                                        class="node-paragraph"
                                        style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                        <span><strong>Group Name: </strong></span
                                        >${group_name}
                                      </p>
                                      <hr
                                        class="divider"
                                        style="width:100%;border:none;border-top:1px solid #eaeaea;padding-bottom:1em;border-width:2px" />
                                      <p
                                        style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                        <span><strong>Date</strong></span
                                        ><span>: </span>${date}
                                      </p>
                                      <hr
                                        class="divider"
                                        style="width:100%;border:none;border-top:1px solid #eaeaea;padding-bottom:1em;border-width:2px" />
                                      <p
                                        style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                        <span><strong>Time:</strong></span
                                        ><span> </span>${time}
                                      </p>
                                      <hr
                                        class="node-divider divider"
                                        style="width:100%;border:none;border-top:1px solid #eaeaea;padding-bottom:1em;border-width:2px" />
                                      <p
                                        class="node-paragraph"
                                        style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                        <span><strong>Amount Paid: </strong></span
                                        >${amount}
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <hr
                                class="node-divider divider"
                                style="width:100%;border:none;border-top:1px solid #eaeaea;padding-bottom:1em;border-width:2px" />
                              <p
                                class="node-paragraph"
                                style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                <br />
                              </p>
                              <hr
                                class="node-divider divider"
                                style="width:100%;border:none;border-top:1px solid #eaeaea;padding-bottom:1em;border-width:2px" />
                              <p
                                class="node-paragraph"
                                style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                <span>For any enquiries contact 📞 </span
                                ><span><strong>+91 123456789</strong></span
                                ><span> or email us at ✉️ </span
                                ><span
                                  ><a
                                    href="mailto:hello@thebiva.com"
                                    rel="noopener noreferrer nofollow"
                                    style="color:#0670DB;text-decoration-line:none;text-decoration:underline"
                                    target="_blank"
                                    ><strong>hello@thebiva.com</strong></a
                                  ></span
                                >
                              </p>
                              <hr
                                class="node-divider divider"
                                style="width:100%;border:none;border-top:1px solid #eaeaea;padding-bottom:1em;border-width:2px" />
                              <p
                                class="node-paragraph"
                                style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em;background-color:rgb(227, 226, 124)">
                                <span>Follow us on blah blah blah</span>
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <!--/$-->
    </body>
  </html>`;
}
