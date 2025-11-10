/**
 * localStorage 封装
 */
export const storage = {
  /**
   * 设置存储项
   * @param key 键
   * @param value 值
   */
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('localStorage set error:', error);
    }
  },

  /**
   * 获取存储项
   * @param key 键
   * @returns 值
   */
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('localStorage get error:', error);
      return null;
    }
  },

  /**
   * 删除存储项
   * @param key 键
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('localStorage remove error:', error);
    }
  },

  /**
   * 清空所有存储项
   */
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('localStorage clear error:', error);
    }
  },
};

/**
 * sessionStorage 封装
 */
export const sessionStorage = {
  set<T>(key: string, value: T): void {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('sessionStorage set error:', error);
    }
  },

  get<T>(key: string): T | null {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('sessionStorage get error:', error);
      return null;
    }
  },

  remove(key: string): void {
    try {
      window.sessionStorage.removeItem(key);
    } catch (error) {
      console.error('sessionStorage remove error:', error);
    }
  },

  clear(): void {
    try {
      window.sessionStorage.clear();
    } catch (error) {
      console.error('sessionStorage clear error:', error);
    }
  },
};

