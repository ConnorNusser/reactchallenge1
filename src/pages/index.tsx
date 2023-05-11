import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

let files = {
  children : [
  {
      name:'node_modules',
      children : [
        {
          name: 'react-bootstrap',
        },
        {
          name: 'other-library'
        }
      ]
  },
  {
  name:'app.tsx',
  },
  {
  name:'pages',
      children : [
        {
          name: 'api',
          children : [{

          
            name: 'api1.tsx'
          },
          {
            name: 'api2.tsx'
          }
          ]
        },
        {
          name: 'other-folder'
        }
      ]
  }
  ]
}


type TEntry = {
  name: string,
  children?: TEntry[];
}

type TEntryBoolean = {
  isVisible: boolean,
  nestedValues: string[]
}

type TEntryUI = TEntry & TEntryBoolean;
const EntryComp = ({name, children, isVisible, nestedValues}:any) => {
  const currNested: string[] = nestedValues.concat(name);
  const [showChildren, setChildren] = useState(false);
  const [newInput, setInput] = useState('');
  const AddComponent = () => {
    let prop: any = files.children;
    let temp: any;
    for(const child of currNested){
      let val = prop.length != undefined? prop.length : 0 
      console.log(child);
      for(let i = 0; i < val; i++){
        if(child == prop[i].name){
          temp = prop[i];
          break;
        }
      }
      console.log(prop);
      prop = temp;
    };
    prop.children.push({
      name: newInput,
    });
    
  }
  return (
    <>
      <button style={{fontFamily:'monospace', margin:'1rem',color:'white', backgroundColor:'blue', borderRadius:'12px', fontSize:'24px'}} onClick={() => setChildren(!showChildren)}>{name}{showChildren == false ? '+': '-'}</button>
      <ul>
          <input value = {newInput} onChange={(e) => setInput(e.target.value)} placeholder='Add New Value'/><button onClick={AddComponent}>Add</button>
      </ul>
      {children?.length && showChildren == true && (
        <div>
          {children.map((child:any) => (
            <ul key={child.name}>
              <EntryComp name={child.name} children = {child.children} isVisible= {isVisible} nestedValues={currNested}/>
            </ul>
          ))}
        </div>
      )}
    </>
  )
}
export default function Home() {
  return (
    <main>
      <div>
        {
          files.children.map((data) => (
            <div style={{paddingBottom:'2rem'}}>
            <EntryComp name={data.name} children= {data.children} isVisible={true} nestedValues={[]}/>
            </div>
          ))
        }

      </div>
    </main>
  )
}
