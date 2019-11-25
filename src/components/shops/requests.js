import axios from 'axios';
import { API_URL } from '../../config/env';

export async function fetchIcecreamShops(filters) {
  try {
    const response = await axios.post(
      `${API_URL}icecream-shops/list`, filters,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    );
    return { result: response.data.result, total: response.data.total, success: true };
  } catch (error) {
    return { result: [], success: false };
  }
}

export async function createNewShop(data) {
  try {
    const response = await axios.post(
      `${API_URL}icecream-shops/create`, data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function editShop(data) {
  try {
    const response = await axios.post(
      `${API_URL}icecream-shops/edit`, data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function uploadFile(formData) {
  try {
    const response = await axios.post(
      `${API_URL}files/upload`, formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    return '';
  }
}

export async function fetchIcecreamShop(id) {
  try {
    const response = await axios.get(
      `${API_URL}icecream-shops/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function createPost(data) {
  try {
    const response = await axios.post(
      `${API_URL}posts/create`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function addPostComment(data) {
  try {
    const response = await axios.post(
      `${API_URL}posts/addComment`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function addOpinion(data) {
  try {
    const response = await axios.post(
      `${API_URL}opinions/add`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function addOpinionComment(data) {
  try {
    const response = await axios.post(
      `${API_URL}opinions/addComment`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function addFlavourReaction(data) {
  try {
    const response = await axios.post(
      `${API_URL}flavours/reactions/add`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function removeFlavourReaction(data) {
  try {
    const response = await axios.post(
      `${API_URL}flavours/reactions/remove`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function addFlavour(data) {
  try {
    const response = await axios.post(
      `${API_URL}flavours/add`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function addFavorite(data) {
  try {
    const response = await axios.post(
      `${API_URL}icecream-shops/addToFavorite`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function removeFavorite(data) {
  try {
    const response = await axios.post(
      `${API_URL}icecream-shops/removeFromFavorite`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return null;
  }
}
