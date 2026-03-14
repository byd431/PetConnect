import axios from 'axios';
import { Post, Comment } from '../../types';

const API_URL = 'http://localhost:8080/api/posts';
const COMMENT_API_URL = 'http://localhost:8080/api/comments';

const getToken = () => JSON.parse(localStorage.getItem('auth-storage-v2') || '{}').state?.token;

export const socialService = {
    getFeed: async (): Promise<Post[]> => {
        const token = getToken();
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },
    createPost: async (postData: {titulo: string, contenido: string, tipo: string}): Promise<Post> => {
        const token = getToken();
        const response = await axios.post(API_URL, postData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },
    addComment: async (postId: number, contenido: string): Promise<Comment> => {
        const token = getToken();
        const response = await axios.post(`${COMMENT_API_URL}/${postId}`, contenido, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'text/plain' 
            }
        });
        return response.data;
    }
};
