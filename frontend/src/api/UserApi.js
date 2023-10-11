
const portNumber = 3000;
const backendURI = `http://localhost:${portNumber}`;


const UserApi = {

    getUserByCredentials: async (credentials) => {
        try {
            console.log(credentials);
            const response = await fetch(`${backendURI}/userEndpoint`);

            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`)
            }


            // Deal with the data being returned from the backend here

            const data = await response.json();
            console.log(data);
            
            
        } catch (error) {
            console.error("Error in getUserByCredentials:", error);
        }
    },

    createUser: async (userInfo) => {
        try {
            
            const response = await fetch(`${backendURI}/userEndpoint`, {
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

            console.log(data);

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