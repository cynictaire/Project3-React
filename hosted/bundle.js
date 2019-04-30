"use strict";

var handlePost = function handlePost(e) {
    e.preventDefault();

    $("#postMessage").animate({ width: 'hide' }, 350);

    if ($("#pName").val() === '' || $("#pAge").val() === '' || $("#pSpecies").val() === '' || $("#pRace").val() === '' || $("#pJob").val() === '' || $("#pDesc").val() === '') {
        handleError("Required fields have not been filled yet.");
        return false;
    }

    sendAjax('POST', $("#postForm").attr("action"), $("#postForm").serialize(), function () {
        loadPostsFromServer();
    });

    return false;
};

var PostForm = function PostForm(props) {
    return React.createElement(
        "form",
        { id: "postForm",
            onSubmit: handlePost,
            name: "postForm",
            action: "/maker",
            method: "POST"
        },
        React.createElement(
            "h3",
            { className: "formTitle" },
            "\u2727 Create an OC! \u2727"
        ),
        React.createElement(
            "p",
            { className: "charTags" },
            "*Name: "
        ),
        React.createElement("input", { id: "pName", type: "text", name: "charName", placeholder: "John Smith" }),
        React.createElement(
            "p",
            { className: "charTags" },
            "Nickname(s): "
        ),
        React.createElement("input", { id: "pNicks", type: "text", name: "charNicks", placeholder: "Johnny" }),
        React.createElement(
            "p",
            { className: "charTags" },
            "*Age: "
        ),
        React.createElement("input", { id: "pAge", type: "text", name: "charAge", placeholder: "25" }),
        React.createElement(
            "p",
            { className: "charTags" },
            "*Species: "
        ),
        React.createElement("input", { id: "pSpecies", type: "text", name: "charSpecies", placeholder: "human" }),
        React.createElement(
            "p",
            { className: "charTags" },
            "Race: "
        ),
        React.createElement("input", { id: "pRace", type: "text", name: "charRace", placeholder: "caucasian" }),
        React.createElement(
            "p",
            { className: "charTags" },
            "*Occupation: "
        ),
        React.createElement("input", { id: "pJob", type: "text", name: "charJob", placeholder: "office worker" }),
        React.createElement(
            "p",
            { className: "charTags" },
            "*Description: "
        ),
        React.createElement("textarea", { id: "pContent", type: "text", name: "charDesc", placeholder: "Dull, forgettable, humble." }),
        React.createElement("input", { type: "hidden", id: "csrfVal", name: "_csrf", value: props.csrf }),
        React.createElement("input", { id: "postSubmit", type: "submit", value: "Generate" }),
        React.createElement(
            "p",
            { className: "charTags" },
            "*Required"
        )
    );
};

// Delete Posts
var handleDelete = function handleDelete(e, post) {

    //NEVER FORGET
    e.preventDefault();

    console.log($("#" + post.charName + "deleteForm").serialize() + document.querySelector("#csrfVal").value);

    var postSerialize = $("#" + post.charName + "deleteForm").serialize() + document.querySelector("#csrfVal").value;

    //console.log(postSerialize);

    sendAjax('POST', $("#" + post.charName + "deleteForm").attr("action"), postSerialize, function () {
        loadPostsFromServer();
    });

    return false;
};

var PostList = function PostList(props) {
    if (props.posts.length === 0) {
        return React.createElement("div", { className: "postList" });
    }

    var postNodes = props.posts.map(function (post) {

        return React.createElement(
            "div",
            { key: post._id, className: "post" },
            React.createElement("img", { src: "/assets/img/domoface.jpeg", alt: "post face", className: "postFace" }),
            React.createElement(
                "h3",
                { className: "postTitle" },
                " ",
                post.title,
                " "
            ),
            React.createElement(
                "p",
                { id: "postContent" },
                " Also known as ",
                post.nicks,
                "."
            ),
            React.createElement(
                "p",
                { id: "postContent" },
                " ",
                post.title,
                " is a ",
                post.age,
                " years old ",
                post.race,
                " ",
                post.species,
                ", who enjoys being a ",
                post.job,
                "."
            ),
            React.createElement("br", null),
            React.createElement(
                "p",
                { id: "bgTitle" },
                "Background: "
            ),
            React.createElement(
                "p",
                { id: "postContent" },
                " ",
                post.post,
                " "
            ),
            React.createElement(
                "form",
                { id: post.charName + "deleteForm",
                    onSubmit: function onSubmit(e) {
                        return handleDelete(e, post);
                    },
                    name: "deleteForm",
                    action: "/delete",
                    method: "POST"
                },
                React.createElement("input", { type: "hidden", name: "postID", value: post._id }),
                React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
                React.createElement("input", { id: "deleteButton", type: "submit", value: "Delete" })
            ),
            React.createElement("img", { src: "/assets/img/divider.gif", alt: "post divider", className: "postDivider" })
        );
    });

    return React.createElement(
        "div",
        { className: "postList" },
        postNodes
    );
};

// Password Change
var handleChangePW = function handleChangePW(e) {
    e.preventDefault();

    $("#postMessage").animate({ width: 'hide' }, 350);

    if ($("#oldPass").val() === '' || $("#pass").val() === '' || $("#pass2").val() === '') {
        handleError("All fields are required");
        return false;
    }

    if ($("#pass").val() !== $("#pass2").val()) {
        handleError("Passwords do not match");
        return false;
    }

    sendAjax('POST', $("#changePWForm").attr("action"), $("#changePWForm").serialize(), redirect);
    return false;
};

// Password Change Form
var ChangePWForm = function ChangePWForm(props) {
    return React.createElement(
        "form",
        { id: "changePWForm",
            onSubmit: handleChangePW,
            name: "changePWForm",
            action: "/changePW",
            method: "POST",
            className: "changePWForm"
        },
        React.createElement(
            "h3",
            { className: "formTitle" },
            "\u2727 Password Change \u2727"
        ),
        React.createElement("input", { id: "oldPass", type: "password", name: "oldPass", placeholder: "current password" }),
        React.createElement("input", { id: "pass", type: "passoword", name: "pass", placeholder: "new password" }),
        React.createElement("input", { id: "pass2", type: "password", name: "pass2", placeholder: "retype password" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { type: "submit", id: "pwSubmit", value: "Change Password" })
    );
};

// Site About
var AboutWindow = function AboutWindow() {
    return React.createElement(
        "div",
        { id: "info" },
        React.createElement(
            "h3",
            { className: "formTitle" },
            "\u2727 What is OC Tracker? \u2727"
        ),
        React.createElement(
            "div",
            { "class": "desc" },
            React.createElement(
                "ul",
                null,
                React.createElement(
                    "li",
                    null,
                    "Have too many original characters you can't keep track of?"
                ),
                "Yes!",
                React.createElement(
                    "li",
                    null,
                    "Do you have a hard time remembering small details of your characters?"
                ),
                "YES!",
                React.createElement(
                    "li",
                    null,
                    "Want to have a simple way to gather all your characters in one place?"
                ),
                "Y E S!"
            ),
            React.createElement(
                "p",
                null,
                "If you answered yes to all the questions above, OC Tracker is the place for you!"
            ),
            React.createElement(
                "p",
                null,
                "On this site, you will be able to keep track of all your characters--from the mains to the one-off background characters!"
            ),
            React.createElement(
                "p",
                null,
                "If you have trouble with your character creation process, you can check out the TIPS section for help!"
            )
        )
    );
};

// Yearly subscription service
var SubWindow = function SubWindow() {
    return React.createElement(
        "div",
        { id: "subscription" },
        React.createElement(
            "h3",
            { className: "formTitle" },
            "\u2727 Subscription \u2727"
        ),
        React.createElement(
            "div",
            { "class": "desc" },
            React.createElement(
                "p",
                null,
                "For $19.99 a year, you will be able to:"
            ),
            React.createElement(
                "ul",
                null,
                React.createElement(
                    "li",
                    null,
                    "Upload art of your original characters."
                ),
                React.createElement(
                    "li",
                    null,
                    "Request art for your original characters (one per month)."
                ),
                React.createElement(
                    "li",
                    null,
                    "Receive daily prompts to improve your writing skill."
                )
            )
        ),
        React.createElement(
            "div",
            { id: "sub" },
            "SUBCRIBE NOW!"
        )
    );
};

// Tips Page
var TipsWindow = function TipsWindow() {
    return React.createElement(
        "div",
        { id: "tips" },
        React.createElement(
            "h3",
            { className: "formTitle" },
            "\u2727 Tips and Tricks \u2727"
        ),
        React.createElement(
            "div",
            { "class": "desc" },
            React.createElement(
                "p",
                null,
                "Needs help coming up with names? Check out these sites!"
            ),
            React.createElement(
                "ul",
                null,
                React.createElement(
                    "li",
                    null,
                    React.createElement(
                        "a",
                        { href: "https://www.fantasynamegenerators.com/" },
                        "Fantasy Name Generator"
                    )
                ),
                React.createElement(
                    "li",
                    null,
                    React.createElement(
                        "a",
                        { href: "https://www.behindthename.com/" },
                        "Behind the Name"
                    )
                )
            ),
            React.createElement(
                "p",
                null,
                "For coming up with the story and get started on writing!"
            ),
            React.createElement(
                "ul",
                null,
                React.createElement(
                    "li",
                    null,
                    React.createElement(
                        "a",
                        { href: "http://writingexercises.co.uk/index.php" },
                        "Writing Exercises"
                    )
                )
            ),
            React.createElement(
                "p",
                null,
                "Other useful sites!"
            ),
            React.createElement(
                "ul",
                null,
                React.createElement(
                    "li",
                    null,
                    React.createElement(
                        "a",
                        { href: "http://www.onelook.com/reverse-dictionary.shtml" },
                        "Reverse Dictionary"
                    )
                ),
                React.createElement(
                    "li",
                    null,
                    React.createElement(
                        "a",
                        { href: "http://phrontistery.info/a.html" },
                        "The Phrontistery"
                    )
                )
            )
        )
    );
};

var loadPostsFromServer = function loadPostsFromServer() {
    sendAjax('GET', '/getPosts', null, function (data) {
        ReactDOM.render(React.createElement(PostList, { posts: data.posts }), document.querySelector("#posts"));
    });
};

// Windows For Different Pages
var createPasswordChangeWindow = function createPasswordChangeWindow(csrf) {
    document.querySelector("#posts").style.display = "none";
    ReactDOM.render(React.createElement(ChangePWForm, { csrf: csrf }), document.querySelector("#makePost"));
};

var createAboutWindow = function createAboutWindow() {
    document.querySelector("#posts").style.display = "none";
    ReactDOM.render(React.createElement(AboutWindow, null), document.querySelector("#makePost"));
};

var createSubWindow = function createSubWindow() {
    document.querySelector("#posts").style.display = "none";
    ReactDOM.render(React.createElement(SubWindow, null), document.querySelector("#makePost"));
};

var createTipsWindow = function createTipsWindow() {
    document.querySelector("#posts").style.display = "none";
    ReactDOM.render(React.createElement(TipsWindow, null), document.querySelector("#makePost"));
};

var createMainWindow = function createMainWindow(csrf) {
    ReactDOM.render(React.createElement(PostForm, { csrf: csrf }), document.querySelector("#makePost"));

    ReactDOM.render(React.createElement(PostForm, { posts: [], csrf: csrf }), document.querySelector("#posts"));
};

var setup = function setup(csrf) {
    var changePWButton = document.querySelector("#changePWButton");
    var aboutButton = document.querySelector("#aboutButton");
    var subButton = document.querySelector("#subButton");
    var tipsButton = document.querySelector("#tipsButton");

    changePWButton.addEventListener("click", function (e) {
        e.preventDefault();
        createPasswordChangeWindow(csrf);
        return false;
    });

    aboutButton.addEventListener("click", function (e) {
        e.preventDefault();
        createAboutWindow();
        return false;
    });

    subButton.addEventListener("click", function (e) {
        e.preventDefault();
        createSubWindow();
        return false;
    });

    tipsButton.addEventListener("click", function (e) {
        e.preventDefault();
        createTipsWindow();
        return false;
    });

    createMainWindow(csrf);
    loadPostsFromServer();
};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});
"use strict";

var handleError = function handleError(message) {
    $("#errorMessage").text(message);
    $("#postMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
    $("#postMessage").animate({ width: 'hide' }, 350);
    window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function error(xhr, status, _error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};
