import { useFetchAlbumsQuery, useAddAlbumMutation  } from "../store";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import AlbumsListItem from "./AlbumListItem";

function AlbumList({ user }) {
    const { data, error, isFetching } = useFetchAlbumsQuery(user);
    const [addAlbum, results] = useAddAlbumMutation();

    const handleAddAlbum = () => {
        addAlbum(user);
    }


    let content;
    if(isFetching){
        content = <Skeleton className="h-10 w-full" times={3} />
    } else if (error){
        content = <div>error loading albums</div>
    } else{
        content = data.map(album => {
            return <AlbumsListItem key={album.id} album={album} />;
        });
    }



    return(
        <div>
    <div className="m-2 flex flex-row items-center justify-between"> 
        <h3 className="text-lg font-bold">albums for {user.name}</h3>
        <Button loading={results.isLoading} onClick={handleAddAlbum}>
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