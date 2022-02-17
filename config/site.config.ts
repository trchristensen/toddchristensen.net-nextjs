const home = {
  title: "Home",
  path: "/",
  external_link: false,
};
const about = {
  title: "About",
  path: "/about",
  external_link: false,
};

const guestbook = {
  title: "Guestbook",
  path: "/guestbook",
  external_link: false,
};

const books = {
  title: "Books",
  path: "/books",
  external_link: false,
};

const resume = {
  title: "Resume",
  path: "https://docs.google.com/document/d/1AVXTyyuJYV1dfKAlz2BPQqpF041rQx1kz1Ug9BHOmbU/edit?usp=sharing",
  external_link: true,
};

const bookmarks = {
  title: "Bookmarks",
  path: "/bookmarks",
  external_link: false,
};

const dashboard = {
  title: "Dashboard",
  path: "/dashboard",
  external_link: false,
};

const blog = {
  title: "Blog",
  path: "/blog",
  external_link: false,
};

const projects = {
  title: "Projects",
  path: "/projects",
  external_link: false,
};

const snippets = {
  title: "Snippets",
  path: "/snippets",
  external_link: false,
};
const newsletter = {
  title: "Newsletter",
  path: "/newsletter",
  external_link: false,
};

const tweets = {
  title: "Tweets",
  path: "/tweets",
  external_link: false,
};

const uses = {
  title: "Uses",
  path: "/uses",
  external_link: false,
};

export const socialLinks = {
  twitter: {
    title: "Twitter",
    path: "http://twitter.com/christensen_tr",
    external_link: true,
  },
  github: {
    title: "Github",
    path: "http://twitter.com/trchristensen",
    external_link: true,
  },
};

export const site = {
  mainMenu: [
    home,
    projects,
    guestbook,
    blog,
    // dashboard,
    bookmarks,
    books,
    resume
    // about,
    // snippets,
  ],
  footerMenu: [
    home,
    projects,
    guestbook,
    blog,
    // dashboard,
    bookmarks,
    // about,
    // newsletter,
    // snippets,
    // tweets,
    // uses,
    resume,
    socialLinks.twitter,
    socialLinks.github,
  ],
};
