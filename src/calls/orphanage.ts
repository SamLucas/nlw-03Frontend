import api from '../services/api'

function OrphanageModel() {
  const getDataAllOrphanage = async () => {
    return await api.get('orphanage').then(({ data }) => data)
  }

  const getDataOrphanage = async (id: string) => {
    return await api.get(`orphanage/${id}`).then(({ data }) => data)
  }

  const createOrphanage = async (data: FormData) => {
    return await api.post('orphanage', data).then(({ data }) => data)
  }

  return {
    getDataAllOrphanage,
    getDataOrphanage,
    createOrphanage
  }
}

export default OrphanageModel()