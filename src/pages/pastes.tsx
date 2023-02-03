import { serverSideApolloFetching } from "@/apollo/serverSideApolloFetching"
import Paste from "@/components/Paste"
import { PASTES } from "@/graphql/queries"
import { PasteProps } from "interfaces"

export default function Pastes({ pastes }: { pastes: PasteProps[] }) {
  console.log(pastes)
  return (
    <main className="flex place-content-center box-border">
      <div className="w-full max-w-maximum h-full p-5 pt-20 box-border bg-green-2">
        <h1 className="text-white text-xl">Pastes list</h1>
        <ul className="flex flex-col w-full mt-5">
          {pastes &&
            pastes.map((paste: PasteProps) => (
              <Paste
                key={paste.id}
                title={paste.title}
                link={paste.id}
                createdAt={paste.createdAt}
                syntaxHighlight={paste.syntax_highlight}
              />
            ))}
        </ul>
      </div>
    </main>
  )
}

export async function getServerSideProps({ req, res }: { req: any; res: any }) {
  const data = await serverSideApolloFetching({
    fetch: "query",
    req,
    res,
    schema: PASTES
  })
  const pastes = data.data.pastes
  return {
    props: {
      pastes
    }
  }
}
