// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

// Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
// Output: 7 -> 0 -> 8

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

    var addTwoNumbers = function(l1, l2) {
        
        var isThanNine = false;
        var firstNode;
        var currentNode;
        var l1CurrentNode =l1;
        var l2CurrentNode =l2;
        
        var addValue = (function() { // 带进位的加法
            return function(node1, node2) {
                // 对计算做保护
                var value1 =node1 && node1.val;
                // return value1
                var value2 =node2 && node2.val;
                // return value2;
                var sm = (value1 || 0) + (value2 || 0);
                if (isThanNine) {
                    sm += 1;
                    isThanNine = false;
                }
                if (sm >= 10) {
                    isThanNine = true;
                    return (sm - 10);
                } else {
                    return sm;
                }
            }
        })();
        
        if(l1CurrentNode === null && l2CurrentNode === null) { // 对空链表做处理,如果为空直接返回空
        
            return null;
            
        } else {
            
            firstNode = new ListNode(addValue(l1CurrentNode, l2CurrentNode)); // 如果链表至少有一个有值,计算当前节点的值.
            currentNode = firstNode; // 并将当前节点指向第一个节点.
            l1CurrentNode = l1CurrentNode.next;
            l2CurrentNode = l2CurrentNode.next;
            
            
            while (l1CurrentNode !== null && l2CurrentNode !== null) { // 当两个链表当前节点都存在;
                // 切换到下一个节点,计算新节点的值
                currentNode.next = new ListNode(addValue(l1CurrentNode, l2CurrentNode));
                l1CurrentNode = l1CurrentNode.next;
                l2CurrentNode = l2CurrentNode.next;
                currentNode = currentNode.next;
            }
            
            if(l1CurrentNode !== null ||  l2CurrentNode !== null) { // 只有一个链表时,找到唯一的链表节点
               var existSingleNode = l1CurrentNode || l2CurrentNode;

               while(existSingleNode !== null) {
                  currentNode.next = new ListNode(addValue(existSingleNode));
                  currentNode = currentNode.next;
                  existSingleNode = existSingleNode.next;
               }
                
            }
            
            if (isThanNine) { // 当最后一位数进位时,需要往最后面节点,再增加一个节点.
                currentNode.next = new ListNode(1);
            }
            
            return firstNode;
        }
    };
