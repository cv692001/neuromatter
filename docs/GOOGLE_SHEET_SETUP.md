# Google Sheet email collection setup

The footer "Stay Updated" form and the **Get in Touch** flow (which scrolls to the contact section) collect emails and send them to a Google Sheet.

## 1. Prepare your Google Sheet

- Open your sheet: **https://docs.google.com/spreadsheets/d/10ZyVjdd_h8CoCczAOsZ1pi24_PPksNWgikZNKw3x4mM/edit?usp=drivesdk**
- In **row 1, column A**, add the header: **emails**
- Leave the sheet editable/accessible as needed (e.g. "Anyone with the link can edit" if you want the script to run as you)

## 2. Add the Apps Script

1. In the sheet, go to **Extensions → Apps Script**.
2. Replace any code in the editor with the script below.
3. Save (Ctrl/Cmd + S).

```javascript
function doPost(e) {
  try {
    var params = JSON.parse(e.postData.contents || "{}");
    var email = params.email && String(params.email).trim();
    if (!email) {
      return jsonResponse({ success: false, error: "Email is required." });
    }
    // Basic email format check (local@domain.tld)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ success: false, error: "Please enter a valid email address." });
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var firstCell = sheet.getRange("A1");
    if (firstCell.isBlank()) {
      firstCell.setValue("emails");
    }
    sheet.appendRow([email]);

    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3. Deploy as web app

1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type", choose **Web app**.
3. Set:
   - **Description:** e.g. "Email collection"
   - **Execute as:** Me (your account)
   - **Who has access:** Anyone
4. Click **Deploy**. Authorize the app when prompted (your Google account).
5. Copy the **Web app URL** (looks like `https://script.google.com/macros/s/.../exec`). You will use this in the app.

### If you see "Something went wrong" when deploying

1. **Reload and try again**  
   Click **RELOAD** in the error dialog (or refresh the Apps Script tab). Then go to **Deploy → New deployment** and try again. This often fixes temporary Google issues.

2. **Save and name the project**  
   Press **Ctrl+S** (or Cmd+S) to save. In the top-left, click **Untitled project** and give it a name (e.g. "Email to Sheet"). Save again, then **Deploy → New deployment**.

3. **Choose Web app before Deploy**  
   In "New deployment", first click the **gear icon** next to "Select type" and choose **Web app**. Fill in **Description**, set **Execute as: Me** and **Who has access: Anyone**, then click **Deploy**. The Deploy button may stay disabled until a type is selected.

4. **Use a different browser or incognito**  
   Try Chrome in incognito or another browser (e.g. Chrome/Firefox) in case extensions or cache are affecting the deploy flow.

5. **Deploy from "Test deployments"**  
   Click **Deploy → Test deployments**. If you see an option to create a test deployment or open the web app URL there, use that URL in your `.env` as `VITE_GOOGLE_SHEET_SCRIPT_URL` (the test URL also works for receiving POSTs).

6. **Check Google status**  
   If it still fails, check [Google Workspace Status](https://www.google.com/appsstatus) for any outage and try again later.

## 4. Configure the app

1. In the project root, create or edit **.env**:
   ```env
   VITE_GOOGLE_SHEET_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```
2. Replace the URL with the **Web app URL** you copied.
3. Restart the dev server (`npm run dev`) so the new env is picked up.

After this, when a user enters an email and clicks the send button in the "Stay Updated" section (or reaches the contact section via "Get in Touch"), the email is sent to your Google Sheet and appended under the **emails** column.
