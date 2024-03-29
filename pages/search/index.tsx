import { useRouter } from "next/router";
import SearchPage from '../../components/SearchPage';

export default function searchPage() {
  const {query, isReady} = useRouter();
  const { q } = query;
  return (
    <>
      {isReady && <SearchPage queryTerm={q} />}
    </>
  )
}