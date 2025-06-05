document.addEventListener("keydown", function (e) {
    if (e.key === "~" && e.ctrlKey) {
        let popup = window.open("", "_blank", "width=600,height=400");

        if (!popup) {
            alert("Popup blocked! Please allow popups for this site.");
            return;
        }

        popup.document.title = "uRun";
        popup.document.body.style.margin = "0";
        popup.document.body.style.overflow = "hidden";

        let iframe = popup.document.createElement("iframe");
        iframe.src = "https://raw.githubusercontent.com/MrBypasser/uRun/main/popup.html"; // Fixed URL
        iframe.style.cssText = "width:100%; height:100%; border:none;";

        popup.document.body.appendChild(iframe);

        popup.addEventListener("message", function (event) {
            if (typeof event.data === "string" && event.data.startsWith("execute:")) {
                try {
                    eval(event.data.slice(8));
                } catch (err) {
                    console.error("uRun eval error:", err);
                }
                popup.close();
            }
        });
    }
});
