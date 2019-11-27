import java.lang.Math;
import java.util.Scanner;

public class BinaryTree {

    class Node {
        int value;
        Node left;
        Node right;

        public Node(int value) {
            this.value = value;
            right = null;
            left = null;
        }

        @Override
        public String toString() {
            return ""+value;
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

    public void getQuestions(Node node, int n, Scanner scan) {
        if (node != null) System.out.println(node);
        if (n > 0) {
            boolean answer = scan.nextBoolean();

            if (answer) {
                getQuestions(node.right, --n, scan);
            } else {
                getQuestions(node.left, --n, scan);
            }
        }
    }

    // @param - args[0] is the number of questions we want the user to be answering
    public static void main(String args[]) {
        BinaryTree bt = new BinaryTree();
        int n = Integer.parseInt(args[0]);
        int start = (int)Math.pow(2, n-1);
    
        bt.root = bt.insertNode(start, bt.root, n-1);
    
        Scanner scan = new Scanner(System.in);
        bt.getQuestions(bt.root, n, scan);
    }
}