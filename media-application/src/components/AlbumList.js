import { useFetchAlbumsQuery, useAddAlbumMutation  } from "../store";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";

function AlbumList({ user }) {
    const { data, error, isLoading } = useFetchAlbumsQuery(user);
    const [addAlbum, results] = useAddAlbumMutation();

    const handleAddAlbum = () => {
        addAlbum(user);
    }


    let content;
    if(isLoading){
        content = <Skeleton times={3} />
    } else if (error){
        content = <div>error loading albums</div>
    } else{
        content = data.map(album => {
            const header = <div>{album.title}</div>
            return <ExpandablePanel key={album.id} header={header}>
                list of photos in the album
                </ExpandablePanel>
        })
    }


console.log(data,error, isLoading)

    return(
        <div>
    <div> 
        albums for {user.name}
        <Button onClick={handleAddAlbum}>
            + add album
        </Button>
        </div>
        <div>
            {content}
        </div>
        </div>
    )
}

export default AlbumList;