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
  isVisible: boolean
}

type TEntryUI = TEntry & TEntryBoolean;
const EntryComp = ({name, children, isVisible}:any) => {
  const [showChildren, setChildren] = useState(false);
  return (
    <>
      <button style={{fontFamily:'monospace', margin:'1rem',color:'white', backgroundColor:'blue', borderRadius:'12px', fontSize:'24px'}} onClick={() => setChildren(!showChildren)}>{name}{showChildren == false ? '+': '-'}</button>
      {children?.length && showChildren == true && (
        <div>
          {children.map((child:any) => (
            <ul key={child.name}>
              <EntryComp name={child.name} children = {child.children} isVisible= {isVisible} />
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
            <EntryComp name={data.name} children= {data.children} isVisible={true}/>
            </div>
          ))
        }

      </div>
    </main>
  )
}
