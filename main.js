const navigatorLanguageStr = navigator.language || navigator.userLanguage;

let userLanguage = "English";

if (window.localStorage.getItem("userLanguage") === null) {
	// identify what browser language is
	if (navigatorLanguageStr.indexOf("zh") !== -1) {
		userLanguage = "简体中文";
	}
	if (navigatorLanguageStr.indexOf("en") !== -1) {
		userLanguage = "English";
	}
	window.localStorage.setItem("userLanguage", userLanguage)
} else {
	userLanguage = window.localStorage.getItem("userLanguage");
}

function setLanguage(languageName) {
	window.localStorage.setItem("userLanguage", languageName);
	userLanguage = languageName;
	window.location.reload();
}

function enterDocPage(path) {
	fetch(`./${path}`).then(response => response.text()).then(
		(markdownData) => {
			document.getElementById("docpage_main_content").innerHTML = marked.parse(markdownData);
			document.querySelectorAll("table").forEach(t => {
				t.classList.add("table");
			});

			for (let i = document.getElementById("docpage_contents").childNodes.length - 1; i >= 0; i--) {
				if (`enterDocPage('${path}')` === document.getElementById("docpage_contents").childNodes[i].getAttribute("onclick")) {
					document.getElementById("docpage_contents").childNodes[i].style.color = "black";
				} else {
					document.getElementById("docpage_contents").childNodes[i].style.color = "#990000";
				}
			}

			history.pushState({}, null, window.location.href.replace("?" + window.location.href.split("?")[1], ""));
		}
	)
}

function getUrlArgs(paramName) {
	const url = new URL(window.location.href.replaceAll("#", ""));
	const params = new URLSearchParams(url.search);

	const paramValue = params.get(paramName);

	return paramValue;
}

fetch("./i18n.json")
.then((response) => response.json())
.then((langData) => {
	function render_nav() {
		const navbarHTML = `<nav class="navbar navbar-expand-lg bg-body-tertiary" style="background-color: #e7fbd3!important">
        
            <div class="container-fluid">
              <a class="navbar-brand" href="index.html"><img src="https://pic.koishi514.moe/down/caf66072bbb3eadbd39280fe08578203cc7d8f6a526ba9a83580e2a2" style="height:30px" /> Koishi514 Passport</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link ${websiteCurrentPage==="indexPage"?"active":""}" aria-current="page" href="./index.html"><i class="bi bi-house"></i> ${langData["indexPage"][userLanguage]}</a>
                  </li>
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle ${websiteCurrentPage==="docPage"?"active":""}" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-book"></i> ${langData["docAndGuidePage"][userLanguage]}
                    </a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="./doc.html?nav=${langData["pathOfBeforeStart"][userLanguage]}">${langData["beforeStart"][userLanguage]}</a></li>
                      <li><a class="dropdown-item" href="./doc.html?nav=${langData["pathOfApiInfo"][userLanguage]}">${langData["apiInfo"][userLanguage]}</a></li>
                      <li><a class="dropdown-item" href="./doc.html?nav=${langData["pathOfChangeLog"][userLanguage]}">${langData["changeLog"][userLanguage]}</a></li>
                    </ul>
                  </li>
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="bi bi-translate"></i> ${langData["languageChoose"][userLanguage]}
                    </a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#" onclick="setLanguage('English')">English</a></li>
                      <li><a class="dropdown-item" href="#" onclick="setLanguage('简体中文')">简体中文</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            </nav>`;

		document.getElementById("navbar").innerHTML = navbarHTML;
	}

	function render_indexPage() {
		const indexPageBodyContent = `<br /><div class="container-sm">
            <div class="row">
              <div class="col-1"></div>
              <div class="col-6">
                <h1>${langData["indexPageTitle"][userLanguage]}</h1>
                <p>${langData["indexPageDescription"][userLanguage]}</p>
    
                <button type="button" class="btn btn-outline-dark" style="border-radius:40px" onclick="window.open('https://github.com/scientificworld/oauth2-docs')"><i class="bi bi-github"></i> ${langData["indexPageEnterGitHubBtn"][userLanguage]}</button>
                <br /><br />
    
              </div>
              <div class="col-4">
              <img src="https://pic.koishi514.moe/down/caf66072bbb3eadbd39280fe08578203cc7d8f6a526ba9a83580e2a2" style="height:300px" />
              </div>
              <div class="col-1"></div>
            </div>
          </div>
          <br />`;

		document.getElementById("main_content").innerHTML = indexPageBodyContent;
	}

	function render_bottom_information() {
		const bottom_information_html = `<div class="container-sm">
            <div class="row">
                <div class="col-1"></div>
                <div class="col-10"><hr /><p style="color:grey;">${langData["bottomInformation"][userLanguage]}</p></div>
                <div class="col-1"></div>
            </div>
            </div>`;

		document.getElementById("bottom_information").innerHTML = bottom_information_html;
	}


	function render_docPage() {
		const docPageHtml = `<div class="container-sm">
            <div class="row">
                <div class="col-3" id="docpage_contents" style="background-color:#f7f4f4;border-radius:30px;margin-right:12px;padding-top:12px;">
                
                </div>
                <div class="col-8" id="docpage_main_content">
                
                </div>
                <div class="col-1"></div>
            </div>
            </div>`;

		document.getElementById("main_content").innerHTML = docPageHtml;

		fetch("./contents.json").then(response => response.json()).then(
			(contentsData) => {
				let contentsHtml = ``;
				contentsData = contentsData["contents"][userLanguage];
				for (let i = 0; i < contentsData.length; i++) {
					if (contentsData[i].length === 3) {
						contentsHtml += `<a href="#" style="text-decoration:none;display:block;padding: 10px 20px;" onclick="enterDocPage('${contentsData[i][1]}')">${contentsData[i][0]}</a>`;
						for (let j = 0; j < contentsData[i][2].length; j++) {
							contentsHtml += `<a href="#" style="text-decoration:none;display:block;padding: 5px 50px;" onclick="enterDocPage('${contentsData[i][2][j][1]}')">${contentsData[i][2][j][0]}</a>`;
						}
					} else {
						contentsHtml += `<a href="#" style="text-decoration:none;display:block;padding: 10px 20px;" onclick="enterDocPage('${contentsData[i][1]}')">${contentsData[i][0]}</a>`;
					}
				}
				document.getElementById("docpage_contents").innerHTML = contentsHtml;

				if (getUrlArgs("nav") === null || getUrlArgs("nav") === undefined || getUrlArgs("nav") === "") {
					enterDocPage(`./${contentsData[0][1]}`);
				} else {
					enterDocPage(`${getUrlArgs("nav")}`);
				}
			}
		);
	}

	render_nav();
	if (websiteCurrentPage === "indexPage") {
		render_indexPage();
	} else if (websiteCurrentPage === "docPage") {
		render_docPage();
	}
	render_bottom_information();
});
