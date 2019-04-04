const baseApiUrl = "http://localhost:3000/api/";
const authorsUrl = baseApiUrl + "authors.json";
const coursesUrl = baseApiUrl + "courses.json";

function toJson(response) {
  if (!response.ok) {
    throw new Error("HTTP error " + response.status);
  }
  return response.json();
}

export function getAuthors() {
  return fetch(authorsUrl).then(toJson);
}

export function findAuthor(id) {
  return getAuthors().then(json => {
    const authors = json.filter(a => a.id === id);
    if (authors.length > 1) {
      throw new Error("DB error, fetched more than a single record.");
    }
    return authors.length === 1 ? authors[0] : null;
  });
}

export function searchAuthors(searchTerm) {
  return getAuthors().then(json => {
    return json.filter(a => a.name.includes(searchTerm));
  });
}

export function saveAuthor(author) {
  return fetch(authorsUrl, {
    method: author.id === null ? "POST" : "PUT",
    body: JSON.stringify(author)
  }).then(toJson);
}

export function deleteAuthor(author) {
  return fetch(authorsUrl, {
    method: "DELETE",
    body: JSON.stringify(author)
  }).then(toJson);
}

export function getCourses() {
  return fetch(coursesUrl).then(toJson);
}

export function findCourse(id) {
  return getCourses().then(json => {
    const courses = json.filter(a => a.id === id);
    if (courses.length > 1) {
      throw new Error("DB error, fetched more than a single record.");
    }
    return courses.length === 1 ? courses[0] : null;
  });
}

export function getCoursesByAuthorName(authorName) {
  return getCourses().then(json => {
    return json.filter(a => a.authorsFullnames.includes(authorName));
  });
}

export function searchCourses(searchTerm) {
  return getCourses().then(json => {
    return json.filter(a => a.title.includes(searchTerm));
  });
}

export function saveCourse(course) {
  return fetch(coursesUrl, {
    method: course.id === null ? "POST" : "PUT",
    body: JSON.stringify(course)
  }).then(toJson);
}

export function deleteCourse(course) {
  return fetch(coursesUrl, {
    method: "DELETE",
    body: JSON.stringify(course)
  }).then(toJson);
}
