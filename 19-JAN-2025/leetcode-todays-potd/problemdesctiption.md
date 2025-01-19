# Today's (19-01-2025) leetcode POTD
## 407. Trapping Rain Water II
## https://leetcode.com/problems/trapping-rain-water-ii/


# CPP DEFALT VIEW
```cpp
class Solution {
public:
    int trapRainWater(vector<vector<int>>& heightMap) {
        
    }
};
```
## CPP Solution

```cpp
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int trapRainWater(vector<vector<int>>& heightMap) {
        if (heightMap.empty() || heightMap[0].empty()) return 0;

        int m = heightMap.size(), n = heightMap[0].size();
        priority_queue<pair<int, pair<int, int>>, vector<pair<int, pair<int, int>>>, greater<pair<int, pair<int, int>>>> pq;
        vector<vector<bool>> visited(m, vector<bool>(n, false));

        // Push all boundary cells into the priority queue
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (i == 0 || j == 0 || i == m - 1 || j == n - 1) {
                    pq.push({heightMap[i][j], {i, j}});
                    visited[i][j] = true;
                }
            }
        }

        // Directions for moving in 4 directions (up, down, left, right)
        int dirs[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        int waterTrapped = 0;

        while (!pq.empty()) {
            auto [height, cell] = pq.top();
            pq.pop();
            int x = cell.first, y = cell.second;

            // Explore the 4 neighbors
            for (auto dir : dirs) {
                int nx = x + dir[0], ny = y + dir[1];

                // Skip out-of-bound or already visited cells
                if (nx < 0 || nx >= m || ny < 0 || ny >= n || visited[nx][ny]) continue;

                // If current neighbor's height is lower, water can be trapped
                if (heightMap[nx][ny] < height) {
                    waterTrapped += height - heightMap[nx][ny];
                }

                // Update the neighbor's height to be the current water level
                pq.push({max(heightMap[nx][ny], height), {nx, ny}});
                visited[nx][ny] = true;
            }
        }

        return waterTrapped;
    }
};

int main() {
    Solution solution;
    int testCases;
    cout << "Enter the number of test cases: ";
    cin >> testCases;

    for (int t = 0; t < testCases; t++) {
        int m, n;
        cout << "Enter number of rows and columns for test case " << t + 1 << ": ";
        cin >> m >> n;

        vector<vector<int>> heightMap(m, vector<int>(n));
        cout << "Enter the height map values for test case " << t + 1 << ":\n";
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                cin >> heightMap[i][j];
            }
        }

        cout << "Total water trapped for test case " << t + 1 << ": " << solution.trapRainWater(heightMap) << endl;
    }

    return 0;
}
```
## Time Complexity
The time complexity of the `trapRainWater` function is \( O(m \times n \log (m \times n)) \), where `m` and `n` are the dimensions of the `heightMap`. This is because:

- Each cell is pushed into the priority queue once.
- Each heap operation (push or pop) takes \( O(\log(m \times n)) \).

Thus, the total time complexity is dominated by the heap operations and is \( O(m \times n \log (m \times n)) \).

## Space Complexity
The space complexity is \( O(m \times n) \), which is required for:

- The `visited` matrix that tracks whether each cell has been processed.
- The priority queue that holds up to \( m \times n \) cells.

Thus, the total space complexity is \( O(m \times n) \).

## Approach

1. **Boundary Initialization**: First, we push all boundary cells into the priority queue since they define the boundary of the rainwater trap. These cells cannot hold water, so we treat them as the starting point.

2. **Min-Heap (Priority Queue)**: We use a priority queue (min-heap) to process cells in increasing order of height. This simulates how water would flow from the lowest boundary and fill into valleys.

3. **Direction Exploration**: For each cell processed, we check its 4 neighbors (up, down, left, right). If a neighboring cell is lower than the current water level, water can be trapped, and we calculate the trapped water.

4. **Heap Operations**: For each neighboring cell, we push it into the priority queue with the updated water level (the maximum of its current height and the current water level).

5. **Result**: As we process the cells, we accumulate the total trapped water and return it at the end.

This approach ensures that we correctly calculate the trapped water while expanding from the boundary inward.
