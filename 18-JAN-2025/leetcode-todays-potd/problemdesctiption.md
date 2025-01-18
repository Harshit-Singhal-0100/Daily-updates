# Today's (18-01-2025) leetcode POTD
## 1368. Minimum Cost to Make at Least One Valid Path in a Grid
## https://leetcode.com/problems/minimum-window-substring/

# CPP DEFALT VIEW
```cpp
class Solution {
public:
    int minCost(vector<vector<int>>& grid) {
        // Your code here
    }
};
```
## CPP Solution
```cpp
#include<bits/stdc++.h>

using namespace std;

class Solution {
public:
    int minCost(vector<vector<int>>& grid) {
        int rows = grid.size(), cols = grid[0].size();
        map<pair<int, int>, vector<pair<pair<int, int>, int>>> graph;
        for(int i = 0; i < grid.size(); i++) {
            for(int j = 0; j < grid[i].size(); j++) {
                if(i + 1 < rows) graph[{i, j}].push_back({{i+1, j}, (grid[i][j] != 3)});
                if(i - 1 >= 0) graph[{i, j}].push_back({{i-1, j}, (grid[i][j] != 4)});
                if(j + 1 < cols) graph[{i, j}].push_back({{i, j+1}, (grid[i][j] != 1)});
                if(j - 1 >= 0) graph[{i, j}].push_back({{i, j-1}, (grid[i][j] != 2)});
            }
        }

        for(auto &it : grid) for(auto &i : it) i = INT_MAX;

        priority_queue<pair<int, pair<int, int>>, vector<pair<int, pair<int, int>>>, greater<pair<int, pair<int, int>>>> pq;

        pq.push({0, {0, 0}});
        grid[0][0] = 0;
        while(pq.size()) {
            auto top = pq.top();
            pq.pop();
            int dis = top.first;
            auto cell = top.second;
            for(auto it : graph[cell]) {
                if(dis + it.second < grid[it.first.first][it.first.second]) {
                    grid[it.first.first][it.first.second] = dis + it.second;
                    pq.push({dis + it.second, it.first});
                }
            }
        }
        return grid[rows-1][cols-1];
    }
};

int main() {
    Solution solution;
    int testCases;
    cout << "Enter the number of test cases: ";
    cin >> testCases;

    for(int t = 0; t < testCases; t++) {
        int rows, cols;
        cout << "Enter number of rows and columns for test case " << t+1 << ": ";
        cin >> rows >> cols;

        vector<vector<int>> grid(rows, vector<int>(cols));
        cout << "Enter the grid values for test case " << t+1 << ":\n";
        for(int i = 0; i < rows; i++) {
            for(int j = 0; j < cols; j++) {
                cin >> grid[i][j];
            }
        }

        cout << "Minimum cost for test case " << t+1 << ": " << solution.minCost(grid) << endl;
    }

    return 0;
}
```

# Time Complexity
The time complexity of the `minCost` function is \(O((rows \times cols) \log(rows \times cols))\).

# Space Complexity
The space complexity of the `minCost` function is \(O(rows \times cols)\).

# Approach

1. **Graph Construction**: Create a graph representation of the grid. Each cell in the grid is treated as a node, and directed edges are created to its neighboring cells based on the movement direction costs.

2. **Initialization**: Initialize the distance for each cell in the grid to infinity (`INT_MAX`), except for the starting cell (0,0), which is initialized to 0.

3. **Priority Queue**: Use a priority queue to perform Dijkstra's algorithm. The priority queue stores pairs of the current distance and the cell coordinates, ordered by the minimum distance.

4. **Dijkstra's Algorithm**:
    - While the priority queue is not empty, extract the cell with the minimum distance.
    - For each neighboring cell of the extracted cell, calculate the new distance and update it if it's smaller than the current distance.
    - Push the updated neighboring cell into the priority queue.

5. **Result**: The minimum cost to reach the bottom-right cell (rows-1, cols-1) is stored in `grid[rows-1][cols-1]`. Return this value as the result.

