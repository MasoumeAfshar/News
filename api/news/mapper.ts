import { TNews } from "../../types/news";

export const getMapper = (data: any): Partial<TNews> => {
  return {
    title: data?.webTitle || data.headline?.main || data?.title || '',
    des: data?.des || data?.abstract || data?.description || '',
    publishedAt: data?.webPublicationDate || data?.pub_date || data?.publishedAt || '',
    id: data?.id || data?._id || '',
    url: data?.webUrl || data?.web_url || data?.url ||'',
    sectionName: data?.sectionName || data?.news_desk || '',
    source: data?.source?.name || data?.source ||'',
    author: data?.author || '',
    img: data?.urlToImage || '',
  }
}
export const RTKGetGuardianMapper = (
  response: any
) => ({
    ...response,
    results: response?.response?.results.map(getMapper)
  }
)

export const RTKGetNYtimesMapper = (
  response: any
) => ({
    ...response,
    results: response?.response?.docs.map(getMapper)
  }
)

export const RTKGetNewsAPIMapper = (
  response: any
) => ({
    ...response,
    results: response?.articles.map(getMapper)
  }
)