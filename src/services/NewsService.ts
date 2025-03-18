import axios from 'axios';

export interface NewsItem {
  title: string;
  link: string;
  source: string;
  publishDate: string;
  snippet: string;
  stockName: string;
}

interface NewsApiArticle {
  title: string;
  url: string;
  source: {
    name: string;
  };
  publishedAt: string;
  description: string | null;
}

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsApiArticle[];
}

class NewsService {
  private static readonly NEWS_API_KEY = '44f777cb7e1d4d26b7a4550b67c9f6b2';
  private static readonly NEWS_API_URL = 'https://newsapi.org/v2/everything';

  private getSearchKeywords(stockName: string): string {
    // 根據股票名稱生成相關關鍵字
    const keywords = [
      stockName,
      `${stockName} 股價`,
      `${stockName} 營收`,
      `${stockName} 財報`,
    ];


    return keywords.join(' OR ');
  }

  public async fetchStockNews(stockName: string): Promise<NewsItem[]> {
    try {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      const searchQuery = this.getSearchKeywords(stockName);
      console.log('搜尋關鍵字:', searchQuery); // 用於調試

      const response = await axios.get<NewsApiResponse>(NewsService.NEWS_API_URL, {
        params: {
          q: searchQuery,
          from: oneMonthAgo.toISOString().split('T')[0],
          to: new Date().toISOString().split('T')[0],
          sortBy: 'publishedAt',
          language: 'zh',
          pageSize: 10,
          apiKey: NewsService.NEWS_API_KEY,
          domains: 'money.udn.com,cnyes.com,news.cnyes.com,tw.stock.yahoo.com,udn.com,chinatimes.com,cna.com.tw,storm.mg',
        },
      });

      console.log('API 響應:', response.data.totalResults); // 用於調試

      if (response.data.status !== 'ok') {
        console.error('API 響應錯誤:', response.data);
        return [];
      }

      return response.data.articles.map((article: NewsApiArticle) => ({
        title: article.title,
        link: article.url,
        source: article.source.name,
        publishDate: new Date(article.publishedAt).toLocaleDateString('zh-TW'),
        snippet: article.description || '無摘要',
        stockName: stockName,
      }));
    } catch (error) {
      console.error('抓取新聞時發生錯誤:', error);
      if (axios.isAxiosError(error)) {
        console.error('API 錯誤詳情:', error.response?.data);
      }
      return [];
    }
  }
}

export default new NewsService();
