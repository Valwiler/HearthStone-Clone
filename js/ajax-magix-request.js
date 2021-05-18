const sendAjaxRequest = (Action, uid, targetuid) => {
    var ActionSent = Action;
    let data = new FormData();
    data.append("actionName", ActionSent);
    data.append("uid", uid);
    data.append("targetuid", targetuid);

    return fetch("ajax-magix-request.php", {
            method: 'POST',
            credentials: "include",
            body: data
        })
        .then(response => response.json())
        .then(response => {
            return response;
        })


}