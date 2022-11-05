const myLogin = (dispatch) =>
const {DZ} = window;
DZ.login(
    ({ authResponse: any }) => {
        if (authResponse.accessToken) {
            DZ.api("/user/me", (response: any) => {
                if (response.id) {
                    const URL = `/user/${response.id}/flow?access_token=${authResponse.accessToken}&limit=100&output=jsonp`;
                    fetchJsonp(`https://api.deezer.com${URL}`)
                        .then((resp) => resp.json())
                        .then(({ data }) => {
                            console.log(data);
                            if (data?.length) {
                                dispatch({
                                    type: "FLOW",
                                    payload: data,
                                });
                            }
                        });
                }
            });
        }
    },
    { perms: "basic_access,email" }
);

