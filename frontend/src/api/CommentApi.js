const portNumber = 3000;
const backendURI = `http://localhost:${portNumber}/user`;
const id = 0;

const CommentApi = {
    getAllComments: async (userId, threadId) => {
        try {
            const response = await fetch(`${backendURI}/${userId}/thread/${threadId}/comments`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            
            // Deal with the data being returned from the backend here

            const data = await response
            return data;
            
            
        } catch (error) {
            console.error("Error in getAllComments:", error);
        }
    },

}
export default CommentApi;