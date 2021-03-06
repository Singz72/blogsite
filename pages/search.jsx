import Raect, { useState } from "react";
import Head from "next/head";
import { cloneDeep, indexOf, debounce } from "lodash";
import Layout from "../components/layout";
import Tag from "../components/tag";
import NoData from "../components/noData";
import SearchItem from "../components/searchItem";
import Pagination from "../components/pagination";
import Input from "../components/input";
import { INIT_LANGUAGE } from "../lib/init";
import { sortedPostsData } from "../lib/posts";

export default function SearchComp({ allPostsData }) {
  const [postData] = useState(() => {
    return cloneDeep(allPostsData);
  });

  const [pages, setPages] = useState(() => {
    return {
      total: postData.length,
      pageSize: 6,
      pageNum: 1,
    };
  });

  const [list, setList] = useState(postData);
  const [currentList, setCurrentList] = useState(() => {
    const { pageSize } = pages;
    return list.slice(0, pageSize);
  });

  const pageChange = (page) => {
    const { pageSize } = pages;
    const currentList = list.slice(pageSize * (page - 1), pageSize * page);
    setCurrentList(currentList);
    setPages((prev) => ({
      ...prev,
      pageNum: page,
    }));
  };

  const handleList = (list = postData) => {
    setList(list);
    setCurrentList(() => list.slice(0, pages.pageSize));
    setPages((prev) => ({
      ...prev,
      total: list.length,
      pageNum: 1,
    }));
  };

  const change = debounce((val) => {
    if (val.trim()) {
      const list = postData.filter((post) => {
        const cates = post.category.split(",");
        const i = indexOf(cates, val);
        if (i > -1) {
          return true;
        }
        return false;
      });
      // 还需要对标题名称进行检索，后期再加上内容，不过这个就有点大了
      // 对文章的tag进行扩增
      handleList(list);
      return;
    }
    // 复原
    handleList();
  }, 1000);

  return (
    <Layout>
      <Head>
        <title>文章搜索</title>
      </Head>
      <div className="search">
        <div className="search-box">
          <Input
            placeholder="输入关键词进行搜索..."
            size="large"
            onChange={(e) => change(e.target.value)}
            allowClear
            className="search-input"
          />
          <div className="search-tags">
            {INIT_LANGUAGE.map((lang) => (
              <Tag text={lang} key={lang} />
            ))}
          </div>
        </div>
        <div className="search-list">
          {currentList.length > 0 ? (
            <div className="list-box">
              <div className="list">
                {currentList.map((cur) => (
                  <SearchItem key={cur.id} {...cur} />
                ))}
              </div>
              <div className="pagination">
                <Pagination
                  size="small"
                  total={pages.total}
                  hideOnSinglePage
                  pageSize={pages.pageSize}
                  showSizeChanger={false}
                  currrent={pages.pageNum}
                  onChange={pageChange}
                />
              </div>
            </div>
          ) : (
            <div className="no-data">
              <NoData />
            </div>
          )}
        </div>
        <style jsx>{`
          .search {
            min-height: 100%;
            padding: 0 100px;
            display: flex;
            flex-direction: column;
          }
          .search-box {
            padding: 10px 0;
          }
          .search-tags {
            margin-top: 10px;
            display: flex;
            flex-wrap: wrap;
            height: 50px;
            align-content: space-between;
          }
          .search-list {
            flex-grow: 1;
          }
          .list {
            min-height: 270px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-content: flex-start;
          }
          .pagination {
            margin-top: 8px;
            display: flex;
            justify-content: center;
          }
          .no-data {
            padding-top: 60px;
          }
        `}</style>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = sortedPostsData;
  return {
    props: { allPostsData },
  };
}
