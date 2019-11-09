import java.lang.Math;

public class BinaryTree {

    class Node {
        int value;
        Node left;
        Node right;

        Node(int value) {
            this.value = value;
            right = null;
            left = null;
        }
    }
    
    public Node root;

    private Node insertNode(int start, Node root, int n) {
        if (n >= 0) {
            Node temp = new Node(start);
            root = temp;

            // insert left child
            int leftStart = start - (int)Math.pow(2, n-1);
            root.left = insertNode(leftStart, root.left, n-1);

            // insert right child
            int rightStart = start + (int)Math.pow(2, n-1);
            root.right = insertNode(rightStart, root.right, n-1);
        }
        return root;
    }

    public void traverseInOrder(Node node) {
        if (node != null) {
            traverseInOrder(node.left);
            System.out.print(" " + node.value);
            traverseInOrder(node.right);
        }
    }

    public void traversePreOrder(Node node) {
        if (node != null) {
            System.out.print(" " + node.value);
            traversePreOrder(node.left);
            traversePreOrder(node.right);
        }
    }

    public static void main(String args[]) {
        BinaryTree bt = new BinaryTree();
        int n = 4; // number of questions we want the user to be answering
        int start = (int)Math.pow(2, n-1);

        bt.root = bt.insertNode(start, bt.root, n-1);

        /* Traverse Testing 
        
        System.out.println("Traverse in order:");
        bt.traverseInOrder(bt.root);

        System.out.println("Traverse pre-order:");
        bt.traversePreOrder(bt.root);

        System.out.println();*/
        boolean[] answers = {true, false, true, true};
        bt.getQuestions(bt.root, answers, 0);
    }

    public void getQuestions(Node node, boolean[] answers, int i) {
        if (i < answers.length) {
            System.out.print(node.value + " ");
            if (answers[i]) {
                getQuestions(node.right, answers, ++i);
            } else {
                getQuestions(node.left, answers, ++i);
            }
        }
    }
}