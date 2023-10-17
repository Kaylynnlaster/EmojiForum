
const portNumber = 3000;
const backendURI = `http://localhost:${portNumber}/user`;


const UserApi = {

    getUserByCredentials: async (credentials) => {
        try {
            console.log(credentials);
            const response = await fetch(`${backendURI}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            
            // Deal with the data being returned from the backend here

            const data = await response;
            return data;
            
            
        } catch (error) {
            console.error("Error in getUserByCredentials:", error);
        }
    },

    createUser: async (userInfo, setFeedbackMessage) => {
        try {
            console.log(`${backendURI}/signup`)
            const response = await fetch(`${backendURI}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            })

            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const data = await response.json()
            setFeedbackMessage(data.message);

            // You can either return the data or pass a callback function into this function
            /* 
                For example if the method signature was: createUser: async (userInfo, setUserCreated)
                You can then set the data instead of returning it like so:

                const data = await response.json()
                setUserCreated(data);
            */

        } catch (error) {
            
        }
    }

}



export default UserApi;