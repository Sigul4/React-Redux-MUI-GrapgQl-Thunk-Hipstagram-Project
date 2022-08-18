const getGQL = url =>
(query, variables = {}) =>
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(localStorage.authToken ? { Authorization: "Bearer " + localStorage.authToken } : {}),
            Accept: "application/json",
        },
        body: JSON.stringify({ query, variables }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.data) {
                return Object.values(data.data)[0];
            } else throw new Error(JSON.stringify(data.errors));
        });

const URL = `http://hipstagram.node.ed.asmer.org.ua/`

const gql = getGQL(`${URL}graphql`)

export default gql
