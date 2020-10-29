
import OrphanageModel from '../calls/orphanage'

// import { SetStateAction } from 'react'

interface Orphanage {
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<File>
}

function OrphanageController() {
  const listOrphanageApi = async (action: any, id: string) => {
    const data = await OrphanageModel.getDataOrphanage(id)
    action(data)
  }

  const listOrphanagesApi = async (action: any) => {
    const data = await OrphanageModel.getDataAllOrphanage()
    action(data)
  }

  const createOrphange = async (dataOrphanage: Orphanage) => {

    const data = new FormData()
    data.append('name', dataOrphanage.name);
    data.append('latitude', String(dataOrphanage.latitude));
    data.append('longitude', String(dataOrphanage.longitude));
    data.append('about', dataOrphanage.about);
    data.append('instructions', dataOrphanage.instructions);
    data.append('opening_hours', dataOrphanage.opening_hours);
    data.append('open_on_weekends', String(dataOrphanage.open_on_weekends));

    dataOrphanage.images.forEach((img) => {
      data.append('images', img);
    })

    await OrphanageModel.createOrphanage(data)
  }

  return {
    listOrphanageApi,
    listOrphanagesApi,
    createOrphange
  }
}

export default OrphanageController()