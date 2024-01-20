export default {
  dfs: `
  #include <bits/stdc++.h> 
  using namespace std; 
  const int N = 20; 
  vector<int> a[N + 1];
  bool visited[N + 1];
  
  void DFS(int x) {
      visited[x] = true;
      for(int k = 0; k < a[x].size(); k++) {
          int v = a[x][k];
          if (!visited[v]) DFS(v);
      }
  }
  
  int main() {
    int n, m;
    cin>>n>>m;
    
    while (m--) {
        int u, v;
        cin >> u >> v;
        a[u].push_back(v);
        a[v].push_back(u);
    }
    
    int cnt = 0;
    for (int i = 1; i <= n; i++) {
        if (!visited[i]) {
            DFS(i);
            cnt++;
        }
    }
    
    cout << cnt << endl;
    
    return 0;
  }`,
  bfs: "I2luY2x1ZGUgPGJpdHMvc3RkYysrLmg+CnVzaW5nIG5hbWVzcGFjZSBzdGQ7CgpjbGFzcyBHcmFwaCB7CiAgaW50IFY7CiAgbGlzdDxpbnQ+ICphZGo7CgpwdWJsaWM6CiAgR3JhcGgoaW50IFYpOwogIHZvaWQgYWRkZWRnZShpbnQgdSwgaW50IHYpOwogIHZvaWQgYmZzKGludCBzKTsKfTsKCkdyYXBoOjpHcmFwaChpbnQgVikgewogIHRoaXMtPlYgPSBWOwogIGFkaiA9IG5ldyBsaXN0PGludD5bVl07Cn0KCnZvaWQgR3JhcGg6OmFkZGVkZ2UoaW50IHUsIGludCB2KSB7CiAgYWRqW3VdLnB1c2hfYmFjayh2KTsKICBhZGpbdl0ucHVzaF9iYWNrKHUpOwp9Cgp2b2lkIEdyYXBoOjpiZnMoaW50IHMpIHsKICBxdWV1ZTxpbnQ+IHE7CiAgbGlzdDxpbnQ+OjppdGVyYXRvciBpdDsKICBib29sICp2aXNpdGVkID0gbmV3IGJvb2xbVl07CiAgZm9yIChpbnQgaSA9IDA7IGkgPCBWOyBpKyspIHsKICAgIHZpc2l0ZWRbaV0gPSBmYWxzZTsKICB9CiAgcS5wdXNoKHMpOwogIHZpc2l0ZWRbc10gPSB0cnVlOwogIHdoaWxlICghcS5lbXB0eSgpKSB7CiAgICBzID0gcS5mcm9udCgpOwogICAgLy9jb3V0IDw8IHMgPDwgIiAiOwogICAgcS5wb3AoKTsKICAgIGZvciAoaXQgPSBhZGpbc10uYmVnaW4oKTsgaXQgIT0gYWRqW3NdLmVuZCgpOyBpdCsrKSB7CiAgICAgIGlmICghdmlzaXRlZFsqaXRdKSB7CiAgICAgICAgdmlzaXRlZFsqaXRdID0gdHJ1ZTsKICAgICAgICBxLnB1c2goKml0KTsKICAgICAgICBjb3V0PDxzPDwiLT4iPDwqaXQ8PGVuZGw7CiAgICAgIH0KICAgIH0KICB9Cn0KCmludCBtYWluKCkgewogIEdyYXBoIGcoOSk7CiAgZy5hZGRlZGdlKDAsIDMpOwogIGcuYWRkZWRnZSgwLCA0KTsKICBnLmFkZGVkZ2UoMSwgMyk7CiAgZy5hZGRlZGdlKDEsIDUpOwogIGcuYWRkZWRnZSgxLCA2KTsKICBnLmFkZGVkZ2UoMiwgOCk7CiAgZy5hZGRlZGdlKDMsIDcpOwogIGcuYWRkZWRnZSg0LCA4KTsKICBjb3V0IDw8ICJGb2xsb3dpbmcgaXMgQnJlYWR0aCBGaXJzdCBUcmF2ZXJzYWwgIgogICAgICAgICAgInN0YXJ0aW5nIGZyb20gdmVydGV4IDBcbiI7CiAgZy5iZnMoMCk7CiAgcmV0dXJuIDA7Cn0=",
};
