const handlePost = (e) => {
    e.preventDefault();
    
    $("#postMessage").animate({width:'hide'}, 350);
    
    if ($("#pName").val() === '' || $("#pAge").val() === '' || $("#pSpecies").val() === '' || 
        $("#pJob").val() === '' || $("#pDesc").val() === '') {
        handleError("Required fields have not been filled yet.");
        return false;
    }
    
    sendAjax('POST', $("#postForm").attr("action"), $("#postForm").serialize(), function() {
        loadPostsFromServer();
    });
    
    return false;
};

const PostForm = (props) => {
    return (
        <form id="postForm" 
              onSubmit={handlePost}
              name="postForm"
              action="/maker"
              method="POST"
        >
            <h3 className="formTitle">✧ Create an OC! ✧</h3>
            <p className="charTags">*Name: </p>
            <input id="pName" type="text" name="charName" placeholder="John Smith"/>
            <p className="charTags">Nickname(s): </p>
            <input id="pNicks" type="text" name="charNicks" placeholder="Johnny" />
            <p className="charTags">*Age: </p>
            <input id="pAge" type="text" name="charAge" placeholder="25"/>
            <p className="charTags">*Species: </p>
            <input id="pSpecies" type="text" name="charSpecies" placeholder="human"/>
            <p className="charTags">Race: </p>
            <input id="pRace" type="text" name="charRace" placeholder="caucasian"/>
            <p className="charTags">*Occupation: </p>
            <input id="pJob" type="text" name="charJob" placeholder="office worker"/>
            <p className="charTags">*Description: </p>
            <textarea id="pContent" type="text" name="charDesc" placeholder="Dull, forgettable, humble."></textarea>
            <input type="hidden" id="csrfVal" name="_csrf" value={props.csrf} />
            <input id="postSubmit" type="submit" value="Generate" />
            <p className="charTags">*Required</p>
        </form>
    );
};

// Delete Posts
const handleDelete = (e, post) => {
    
    //NEVER FORGET
    e.preventDefault();

    console.log($(`#${post.charName}deleteForm`).serialize() + document.querySelector("#csrfVal").value);
    
    let postSerialize = $(`#${post.charName}deleteForm`).serialize() + document.querySelector("#csrfVal").value;
    
    //console.log(postSerialize);
    
    sendAjax('POST', $(`#${post.charName}deleteForm`).attr("action"), postSerialize, function() {
        loadPostsFromServer();
    });
    
    return false;
};

const PostList = function(props) {
    if(props.posts.length === 0) {
        return (
            <div className="postList">
            </div>
        );
    }
    
    const postNodes = props.posts.map(function(post) {

        return (
            <div key={post._id} className="post">
                <img src="/assets/img/domoface.jpeg" alt="post face" className="postFace" />
                <h3 className="postTitle"> {post.title} </h3>
                <p id="postContent"> Also known as {post.nicks}.</p>
                <p id="postContent"> {post.title} is a {post.age} years old {post.race} {post.species}, who enjoys being a {post.job}.</p><br>
                </br>
                <p id="bgTitle">Background: </p>
                <p id="postContent"> {post.post} </p>

                
                <form id={`${post.charName}deleteForm`} 
                      onSubmit={(e) => handleDelete(e, post)}
                      name="deleteForm"
                      action="/delete"
                      method="POST"
                >
                    <input type="hidden" name="postID" value={post._id} />
                    <input type="hidden" name="_csrf" value={props.csrf} />
                    <input id="deleteButton" type="submit" value="Delete"/>
                </form>
                <img src="/assets/img/divider.gif" alt="post divider" className="postDivider" />
            </div>
        );
    });
        
    return (
        <div className="postList">
            {postNodes}
        </div>
    );
};

// Password Change
const handleChangePW = (e) => {
    e.preventDefault();
    
    $("#postMessage").animate({width:'hide'}, 350);
    
    if($("#oldPass").val()==='' || $("#pass").val()==='' || $("#pass2").val()===''){
        handleError("All fields are required");
        return false;
    }
    
    if($("#pass").val() !== $("#pass2").val()){
        handleError("Passwords do not match");
        return false;
    }
    
    sendAjax('POST',$("#changePWForm").attr("action"), $("#changePWForm").serialize(), redirect);
    return false;
};

// Password Change Form
const ChangePWForm = (props) => {
    return (
        <form id="changePWForm" 
            onSubmit={handleChangePW}
            name="changePWForm"
            action="/changePW"
            method="POST"
            className="changePWForm"
        >
            <h3 className="formTitle">✧ Password Change ✧</h3>
            <input id="oldPass" type="password" name="oldPass" placeholder="current password"/>
            <input id="pass" type="passoword" name="pass" placeholder="new password"/>
            <input id="pass2" type="password" name="pass2" placeholder="retype password"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input type="submit" id="pwSubmit" value="Change Password" />
        </form>
    );
};

// Site About
const AboutWindow = () => {
  return(
        <div id="info">
            <h3 className="formTitle">✧ What is OC Tracker? ✧</h3>
            <div class="desc">
                <ul>
                    <li>Have too many original characters you can't keep track of?</li>
                    Yes!
                    <li>Do you have a hard time remembering small details of your characters?</li>
                    YES!
                    <li>Want to have a simple way to gather all your characters in one place?</li>
                    Y E S!
                </ul>
                
                <p>If you answered yes to all the questions above, OC Tracker is the place for you!</p>
                <p>On this site, you will be able to keep track of all your characters--from the mains to the one-off background characters!</p>
                <p>If you have trouble with your character creation process, you can check out the TIPS section for help!</p>
            </div>
        </div>
  );
};

// Yearly subscription service
const SubWindow = () => {
    return(
        <div id="subscription">
            <h3 className="formTitle">✧ Subscription ✧</h3>
            <div class="desc">
                <p>For $19.99 a year, you will be able to:</p>
                <ul>
                    <li>Upload art of your original characters.</li>
                    <li>Request art for your original characters (one per month).</li>
                    <li>Receive daily prompts to improve your writing skill.</li>
                </ul>
            </div>
            <div id="sub">SUBCRIBE NOW!</div>
        </div>
    );
};

// Tips Page
const TipsWindow = () => {
    return(
        <div id="tips">
            <h3 className="formTitle">✧ Tips and Tricks ✧</h3>
            <div class="desc">
                <p>Needs help coming up with names? Check out these sites!</p>
                <ul>
                    <li><a href="https://www.fantasynamegenerators.com/">Fantasy Name Generator</a></li>
                    <li><a href="https://www.behindthename.com/">Behind the Name</a></li>
                </ul>
                <p>For coming up with the story and get started on writing!</p>
                <ul>
                    <li><a href="http://writingexercises.co.uk/index.php">Writing Exercises</a></li>
                </ul>
                <p>Other useful sites!</p>
                <ul>
                    <li><a href="http://www.onelook.com/reverse-dictionary.shtml">Reverse Dictionary</a></li>
                    <li><a href="http://phrontistery.info/a.html">The Phrontistery</a></li>
                </ul>
            </div>
        </div>
    );
};

const loadPostsFromServer = () => {
    sendAjax('GET', '/getPosts', null, (data) => {
        ReactDOM.render(
        <PostList posts={data.posts} />, document.querySelector("#posts")
        );
    });
};

// Windows For Different Pages
const createPasswordChangeWindow = (csrf) => {
    document.querySelector("#posts").style.display = "none";
    ReactDOM.render(
        <ChangePWForm csrf={csrf} />, document.querySelector("#makePost")
    );
};

const createAboutWindow = () => {
    document.querySelector("#posts").style.display = "none";
    ReactDOM.render(
        <AboutWindow />, document.querySelector("#makePost")
    );
};

const createSubWindow = () => {
    document.querySelector("#posts").style.display = "none";
    ReactDOM.render(
        <SubWindow />, document.querySelector("#makePost")
    );
};

const createTipsWindow = () => {
    document.querySelector("#posts").style.display = "none";
    ReactDOM.render(
        <TipsWindow />, document.querySelector("#makePost")
    );
};

const createMainWindow = (csrf) => {
    ReactDOM.render(
        <PostForm csrf={csrf} />, document.querySelector("#makePost")
    );
    
    ReactDOM.render(
        <PostForm posts={[]} csrf={csrf} />, document.querySelector("#posts")
    );
};

const setup = function(csrf) {
    const changePWButton = document.querySelector("#changePWButton");
    const aboutButton = document.querySelector("#aboutButton");
    const subButton = document.querySelector("#subButton");
    const tipsButton = document.querySelector("#tipsButton");
    
    changePWButton.addEventListener("click", (e) => {
        e.preventDefault();
        createPasswordChangeWindow(csrf);
        return false;
    });
    
    aboutButton.addEventListener("click", (e) => {
        e.preventDefault();
        createAboutWindow();
        return false;
    });
    
    subButton.addEventListener("click", (e) => {
        e.preventDefault();
        createSubWindow();
        return false;
    });
    
    tipsButton.addEventListener("click", (e) => {
        e.preventDefault();
        createTipsWindow();
        return false;
    });
    
    createMainWindow(csrf);
    loadPostsFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken(); 
});