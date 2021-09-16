
import react, {useState, useEffect} from 'react'
import {v4 as uuid} from "uuid"; 
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'
import {useSelector, useDispatch} from 'react-redux'
import {getTopMusic,getAllMusic} from '../../store/action/MsuicAction'
import {getSongForTopList, updateTopList} from '../../store/action/AdminAction'
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import SnackBer from '../../component/SnackBer'
import Footer from '../../component/footer/Footer'
const itemsFromBackend = [
  {id:uuid(), content:'first task'},
  {id:uuid(), content:'second task'},
  {id:uuid(), content:'third task'},
  {id:uuid(), content:'forth task'},
  {id:uuid(), content:'fifth task'},
]

const columnsFromBackend = {
    ['top']:{
      name:'Top Song',
      items:[]
    },
    ['all']:{
      name:'Drag Here For Delete',
      items:[]
    }
  }

const onDragEnd = (result, columns, setColumns) =>{
  if(!result.destination) return;
  const {source, destination} = result;

  if (source.droppableId !== destination.droppableId){
    const sourceColumn = columns[source.droppableId]
    const destCoulmn = columns[destination.droppableId]
    const sourceItems = [...sourceColumn.items]
    const destItems = [...destCoulmn.items]
    const [removed] = sourceItems.splice(source.index, 1)
    destItems.splice(destination.index, 0 , removed)
    setColumns({
      ...columns,
      [source.droppableId]:{
        ...sourceColumn,
        items:sourceItems
      },
      [destination.droppableId]:{
        ...destCoulmn,
        items:destItems
      }
      
    })

  }else{

  const column = columns[source.droppableId]
  const copiedItems = [...column.items]
  const [remove] = copiedItems.splice(source.index, 1)
  copiedItems.splice(destination.index, 0, remove)
  setColumns({
    ...columns,
    [source.droppableId]:{
      ...column,
      items:copiedItems

    }
  })
}}

function CreateTopList() {
  const [columns, setColumns] = useState(columnsFromBackend)
    const dispatch = useDispatch()


      const {getTopMusicStart, getTopMusicSuccess, getTopMusicFail } = useSelector(state => state.music)
      const {getSongForTopListStart, getSongForTopListSuccess, getSongForTopListFail,
      updateTopListStart, updateTopListSuccess, updateTopListFail } = useSelector(state => state.admin)
      const { accessToken} = useSelector(state => state.auth)

      const config = {
        headers: {
            "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
        },
    };
      

    useEffect(() => {

      {!getTopMusicSuccess && dispatch(getTopMusic())}
      // getAllMusic
      
    }, [])

    useEffect(() => {
      getTopMusicSuccess && getTopMusicSuccess.length>0 && columns && columns.top && columns.top.items.length<1 && setColumns({

        ['top']:{
          name:'Top Song',
          items: getTopMusicSuccess ? getTopMusicSuccess : []
        },
        ['all']:{
          name:'Drag Here For Delete',
          items:[]
        }
    
      })
   
    }, [ getTopMusicSuccess])


    useEffect(() => {
      console.log('use effect');
      getTopMusicSuccess && getTopMusicSuccess.length>0 && columns && columns.top && columns.top.items && setColumns({

        ['top']:{
          name:'Top Song',
          items:getTopMusicSuccess ? getTopMusicSuccess : []
        },
        ['all']:{
          name:'Drag Here For Delete',
          items:[]
        }
    
      })
   
    }, [getTopMusicSuccess])



    const topListId = columns.top.items.filter(items => items.id)

    const handleUpdateTopList = () =>{
      const id=['all']
      columns.top.items.length>0 && columns.top.items.map(song=>{
        console.log(song);
        id.push(song.music.id)
      })
      console.log(id)
      dispatch(updateTopList(id, config))
    } 
 
    const handleSearchInputChante = (e) =>{
 
      dispatch(getSongForTopList(config, e))
  }

  return (
<div className="pageMaindiv"> 
<div className="ToplistSearchbar">
<div class="form-group has-search" id="musicsearch">
                                
 </div>

    <div>
      {updateTopListStart ?<Spin size="large" /> 
      : 
      <button onClick={handleUpdateTopList} className="btn btn" style={{backgroundColor: 'rgb(28, 173, 254)', color: 'white'}} >Save</button>
      }
  </div>
  </div>
    <div className="topListM_D">
      
      <DragDropContext onDragEnd={result=> onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([id, column])=>{
       
          return(
            <div className="allSonglist">
            <h4>{column.name}</h4>
            <div className="songBoard" style={{margin:8}}>

          <Droppable droppableId={id.toString()} key={id.toString()}>
            {(provided, snapshot)=>{
              return(
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{background:  snapshot.isDraggingOver ? 'lightblue':'lightgray',
                padding:4, 
                 minHeight:500
      
              }}>

                {column && column.items && column.items.map((item, index) =>{
                  return(
                    
                  <Draggable key={item.id.toString()} draggableId={item.id.toString()} index={index}>
                   {(provided, snapshot)=>(
                     <div ref={provided.innerRef}
                     {...provided.draggableProps}
                     {...provided.dragHandleProps}
                     style={{
                       userSelect:'none',
                       padding:16,
                       margin:'0 0 8px 0',
                       minHeight:58,
                       backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                       color:'white',
                       ...provided.draggableProps.style
                     }}
                     >
                       
                       {item.music.title} - {item.music.artist}

                     </div>

                   )}

                  </Draggable>
                )})}
                {provided.placeholder}
              </div>
            )}}

          </Droppable>
          </div>
          </div>
        )
       
        })}
      
      </DragDropContext>
      
     
    </div>

    {updateTopListSuccess && <SnackBer  open={true} success_info="top list update"/>}
    
    </div>
  );
}

export default CreateTopList;