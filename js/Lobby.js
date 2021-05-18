const applyStyles = iframe => {
    let styles = {
        fontColor: "#333",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        fontGoogleName: "Sofia",
        fontSize: "20px",
    }

    iframe.contentWindow.postMessage(JSON.stringify(styles), "*");
}