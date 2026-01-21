import { Topic } from '@/types/study';

export const studyTopics: Topic[] = [
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    subtopics: [
      {
        id: 'http',
        title: 'HTTP',
        pages: [
          {
            id: 'http-1',
            title: 'Introduction to HTTP',
            content: `HTTP (HyperText Transfer Protocol) is the foundation of data communication on the World Wide Web. It is an application-layer protocol that defines how messages are formatted and transmitted between web browsers and servers.

HTTP is a stateless protocol, meaning each request is independent and the server does not retain information about previous requests. This simplicity makes it scalable but requires additional mechanisms like cookies or sessions for maintaining state.

The protocol operates on a request-response model: a client (usually a web browser) sends a request to a server, and the server responds with the requested resource or an error message.`,
          },
          {
            id: 'http-2',
            title: 'HTTP Methods',
            content: `HTTP defines several request methods that indicate the desired action to be performed on a resource:

GET - Retrieves data from the server. Should only fetch data and have no other effect. GET requests can be cached and bookmarked.

POST - Submits data to be processed by the server. Often used when submitting forms or uploading files. POST requests are not cached or bookmarked.

PUT - Replaces the entire target resource with the uploaded content. It is idempotent, meaning multiple identical requests have the same effect as a single one.

PATCH - Applies partial modifications to a resource. Unlike PUT, it only updates the specified fields.

DELETE - Removes the specified resource from the server.

HEAD - Same as GET but only returns headers, not the body. Useful for checking if a resource exists or has been modified.

OPTIONS - Returns the HTTP methods supported by the server for a specific URL.`,
          },
          {
            id: 'http-3',
            title: 'HTTP Status Codes',
            content: `HTTP status codes indicate the result of a request. They are grouped into five categories:

1xx (Informational) - Request received, continuing process.
100 Continue - Server has received the request headers.

2xx (Success) - Request was successfully received and processed.
200 OK - Standard success response.
201 Created - Resource was successfully created.
204 No Content - Success but no content to return.

3xx (Redirection) - Further action needed to complete the request.
301 Moved Permanently - Resource has permanently moved.
302 Found - Temporary redirect.
304 Not Modified - Cached version is still valid.

4xx (Client Error) - Request contains errors.
400 Bad Request - Malformed request syntax.
401 Unauthorized - Authentication required.
403 Forbidden - Server refuses to authorize.
404 Not Found - Resource does not exist.

5xx (Server Error) - Server failed to fulfill a valid request.
500 Internal Server Error - Generic server error.
502 Bad Gateway - Invalid response from upstream server.
503 Service Unavailable - Server temporarily overloaded.`,
          },
        ],
      },
      {
        id: 'tcp-ip',
        title: 'TCP/IP',
        pages: [
          {
            id: 'tcp-ip-1',
            title: 'TCP/IP Model Overview',
            content: `The TCP/IP model is a four-layer networking framework that describes how data is transmitted across networks. It was developed by the Department of Defense and became the foundation of the modern Internet.

The four layers are:

1. Application Layer - Provides network services directly to applications. Includes protocols like HTTP, FTP, SMTP, and DNS.

2. Transport Layer - Handles end-to-end communication between hosts. TCP provides reliable, ordered delivery while UDP provides faster but unreliable delivery.

3. Internet Layer - Routes packets across network boundaries. IP (Internet Protocol) is the primary protocol, handling addressing and routing.

4. Network Access Layer - Deals with physical transmission of data over network hardware. Includes Ethernet, Wi-Fi, and other physical protocols.`,
          },
          {
            id: 'tcp-ip-2',
            title: 'TCP Three-Way Handshake',
            content: `TCP establishes a reliable connection using a three-way handshake process:

Step 1: SYN (Synchronize)
The client sends a SYN packet to the server with an initial sequence number. This indicates the client wants to establish a connection.

Step 2: SYN-ACK (Synchronize-Acknowledge)
The server responds with a SYN-ACK packet. It acknowledges the client's sequence number and sends its own sequence number.

Step 3: ACK (Acknowledge)
The client sends an ACK packet acknowledging the server's sequence number. The connection is now established.

This handshake ensures both parties are ready to communicate and have agreed on initial sequence numbers for tracking data packets.

Connection termination uses a four-way handshake with FIN (finish) packets, allowing each side to close their half of the connection independently.`,
          },
          {
            id: 'tcp-ip-3',
            title: 'Ports and Sockets',
            content: `Ports are 16-bit numbers (0-65535) that identify specific processes or services on a networked device. They allow multiple network applications to run simultaneously on the same IP address.

Port ranges:
- Well-known ports (0-1023): Reserved for common services
- Registered ports (1024-49151): Assigned by IANA for specific services
- Dynamic/private ports (49152-65535): Used for temporary connections

Common well-known ports:
- 20, 21: FTP (data and control)
- 22: SSH
- 23: Telnet
- 25: SMTP (email sending)
- 53: DNS
- 80: HTTP
- 443: HTTPS
- 3306: MySQL
- 5432: PostgreSQL

A socket is the combination of an IP address and port number. It uniquely identifies a network endpoint and enables communication between two processes across a network.`,
          },
        ],
      },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    subtopics: [
      {
        id: 'https',
        title: 'HTTPS',
        pages: [
          {
            id: 'https-1',
            title: 'Introduction to HTTPS',
            content: `HTTPS (HyperText Transfer Protocol Secure) is the secure version of HTTP. It encrypts all communication between the browser and server using TLS (Transport Layer Security) or its predecessor SSL (Secure Sockets Layer).

HTTPS provides three key security benefits:

1. Encryption - Data is encrypted so eavesdroppers cannot read the content being transmitted. This protects sensitive information like passwords, credit card numbers, and personal data.

2. Authentication - The server's identity is verified through digital certificates, ensuring you're communicating with the intended website and not an imposter.

3. Data Integrity - Data cannot be modified or corrupted during transfer without detection. This prevents man-in-the-middle attacks from altering the content.

HTTPS is now considered essential for all websites, not just those handling sensitive data. Modern browsers mark HTTP sites as "not secure" and many features require HTTPS.`,
          },
          {
            id: 'https-2',
            title: 'TLS/SSL Certificates',
            content: `TLS certificates are digital documents that verify the identity of a website and enable encrypted connections. They are issued by Certificate Authorities (CAs).

A certificate contains:
- Domain name(s) the certificate covers
- Public key for encryption
- Certificate Authority information
- Validity period
- Digital signature from the CA

Types of certificates:

Domain Validated (DV) - Basic validation that proves domain ownership. Fastest to obtain and least expensive.

Organization Validated (OV) - Validates the organization's identity in addition to domain ownership. Shows company name in certificate details.

Extended Validation (EV) - Most rigorous validation process. Previously showed green address bar in browsers.

Certificate chain of trust:
Root CAs issue intermediate certificates, which sign end-entity certificates. Browsers trust root CAs, creating a chain of trust to verify any certificate.

Let's Encrypt provides free DV certificates and has automated the process, making HTTPS accessible to all websites.`,
          },
        ],
      },
      {
        id: 'authentication',
        title: 'Authentication',
        pages: [
          {
            id: 'auth-1',
            title: 'Authentication Fundamentals',
            content: `Authentication is the process of verifying the identity of a user or system. It answers the question "Who are you?" before granting access to resources.

The three factors of authentication:

1. Something you know - Passwords, PINs, security questions. Most common but vulnerable to theft or guessing.

2. Something you have - Physical tokens, smartphones, smart cards. Harder to steal remotely but can be lost.

3. Something you are - Biometrics like fingerprints, facial recognition, iris scans. Convenient but privacy concerns exist.

Multi-factor authentication (MFA) combines two or more factors for stronger security. Two-factor authentication (2FA) is the most common implementation.

Common authentication methods:
- Username/password
- One-time passwords (OTP)
- Magic links (email-based)
- Social login (OAuth)
- Biometric authentication
- Hardware security keys (FIDO2/WebAuthn)`,
          },
          {
            id: 'auth-2',
            title: 'Sessions and Tokens',
            content: `After authentication, the server needs to remember the user's identity for subsequent requests. Two main approaches exist:

Session-based authentication:
1. User logs in with credentials
2. Server creates a session and stores it (memory, database, Redis)
3. Session ID is sent to client as a cookie
4. Client sends cookie with each request
5. Server looks up session to identify user

Advantages: Server has full control, easy to invalidate
Disadvantages: Server must store sessions, scaling challenges

Token-based authentication (JWT):
1. User logs in with credentials
2. Server creates a signed token containing user data
3. Token sent to client (usually stored in localStorage)
4. Client sends token in Authorization header
5. Server verifies token signature and extracts user data

Advantages: Stateless, scales easily, works across domains
Disadvantages: Cannot easily invalidate, token size can be large

JWT (JSON Web Token) structure:
- Header: Algorithm and token type
- Payload: Claims (user data, expiration)
- Signature: Verifies token integrity`,
          },
          {
            id: 'auth-3',
            title: 'OAuth 2.0',
            content: `OAuth 2.0 is an authorization framework that enables third-party applications to access user resources without exposing credentials. It's commonly used for "Login with Google/Facebook/GitHub" features.

Key roles in OAuth:

Resource Owner - The user who owns the data
Client - The application requesting access
Authorization Server - Authenticates user and issues tokens
Resource Server - Hosts the protected resources

OAuth 2.0 flow (Authorization Code):

1. User clicks "Login with Provider" in the client app
2. Client redirects to authorization server
3. User authenticates and grants permission
4. Authorization server redirects back with authorization code
5. Client exchanges code for access token (server-side)
6. Client uses access token to access resources

Token types:
- Access Token: Short-lived, used to access resources
- Refresh Token: Long-lived, used to get new access tokens
- ID Token (OpenID Connect): Contains user identity information

OAuth provides authorization (what you can do), while OpenID Connect adds authentication (who you are) on top of OAuth.`,
          },
        ],
      },
    ],
  },
  {
    id: 'data-structures',
    title: 'Data Structures',
    subtopics: [
      {
        id: 'arrays-lists',
        title: 'Arrays & Lists',
        pages: [
          {
            id: 'arrays-1',
            title: 'Arrays',
            content: `An array is a collection of elements stored in contiguous memory locations. Each element can be accessed directly using an index.

Characteristics:
- Fixed size (in most languages)
- O(1) random access by index
- Elements stored sequentially in memory
- Same data type for all elements (in typed languages)

Time complexity:
- Access by index: O(1)
- Search (unsorted): O(n)
- Search (sorted, binary search): O(log n)
- Insert at end: O(1) amortized
- Insert at position: O(n)
- Delete: O(n)

Arrays excel when:
- You know the size in advance
- You need fast random access
- You're iterating through all elements
- Memory efficiency is important

Limitations:
- Fixed size requires knowing capacity upfront
- Insertion/deletion in middle is slow
- Wasted space if not fully utilized`,
          },
          {
            id: 'arrays-2',
            title: 'Linked Lists',
            content: `A linked list is a linear data structure where elements are stored in nodes. Each node contains data and a reference (pointer) to the next node.

Types of linked lists:

Singly Linked List - Each node points to the next node. Can only traverse forward.

Doubly Linked List - Each node has pointers to both next and previous nodes. Can traverse in both directions.

Circular Linked List - Last node points back to the first node, forming a circle.

Time complexity:
- Access by index: O(n)
- Search: O(n)
- Insert at beginning: O(1)
- Insert at end: O(n) for singly, O(1) with tail pointer
- Insert at position (given node): O(1)
- Delete (given node): O(1)

Advantages over arrays:
- Dynamic size
- Efficient insertion/deletion
- No wasted memory

Disadvantages:
- No random access
- Extra memory for pointers
- Poor cache performance (non-contiguous memory)`,
          },
        ],
      },
      {
        id: 'trees-graphs',
        title: 'Trees & Graphs',
        pages: [
          {
            id: 'trees-1',
            title: 'Binary Trees',
            content: `A tree is a hierarchical data structure with nodes connected by edges. A binary tree is a tree where each node has at most two children, called left and right.

Key terminology:
- Root: The topmost node
- Parent: Node with children
- Child: Node below a parent
- Leaf: Node with no children
- Height: Longest path from root to leaf
- Depth: Path length from root to a node

Types of binary trees:

Full Binary Tree - Every node has 0 or 2 children.

Complete Binary Tree - All levels filled except possibly the last, which is filled left to right.

Perfect Binary Tree - All internal nodes have 2 children, all leaves at same level.

Binary Search Tree (BST) - Left subtree contains smaller values, right subtree contains larger values.

BST operations (average case):
- Search: O(log n)
- Insert: O(log n)
- Delete: O(log n)

Worst case (unbalanced): O(n)
Self-balancing trees (AVL, Red-Black) maintain O(log n).`,
          },
          {
            id: 'trees-2',
            title: 'Graphs',
            content: `A graph is a collection of vertices (nodes) connected by edges. Unlike trees, graphs can have cycles and multiple paths between nodes.

Graph types:

Directed Graph (Digraph) - Edges have direction (one-way).
Undirected Graph - Edges have no direction (two-way).
Weighted Graph - Edges have associated costs/distances.
Unweighted Graph - All edges are equal.

Graph representations:

Adjacency Matrix - 2D array where matrix[i][j] indicates edge between i and j. O(V^2) space.

Adjacency List - Array of lists where each index contains its neighbors. O(V + E) space.

Common graph algorithms:

BFS (Breadth-First Search) - Explores all neighbors before going deeper. Uses queue. Good for shortest path in unweighted graphs.

DFS (Depth-First Search) - Explores as far as possible before backtracking. Uses stack/recursion. Good for cycle detection, topological sort.

Dijkstra's Algorithm - Finds shortest path in weighted graphs (non-negative weights).

Graph applications: Social networks, maps/navigation, dependency resolution, network routing.`,
          },
        ],
      },
      {
        id: 'hash-maps',
        title: 'Hash Maps',
        pages: [
          {
            id: 'hash-1',
            title: 'Hash Tables',
            content: `A hash table (hash map) is a data structure that maps keys to values using a hash function. It provides near-constant time operations for insertion, deletion, and lookup.

How it works:
1. A hash function converts the key to an integer (hash code)
2. The hash code is mapped to an array index
3. The value is stored at that index

Hash function properties:
- Deterministic: Same key always produces same hash
- Uniform distribution: Spreads keys evenly across buckets
- Fast to compute

Time complexity (average):
- Insert: O(1)
- Delete: O(1)
- Search: O(1)

Worst case: O(n) when all keys hash to same bucket.

Load factor = number of entries / number of buckets

When load factor exceeds threshold (typically 0.75), the table is resized and all entries are rehashed.`,
          },
          {
            id: 'hash-2',
            title: 'Collision Resolution',
            content: `Collisions occur when two different keys hash to the same index. Two main strategies handle this:

Chaining (Separate Chaining):
- Each bucket contains a linked list
- Colliding elements added to the list
- Simple to implement
- Performance degrades with many collisions
- Extra memory for pointers

Open Addressing:
- All elements stored in the array itself
- On collision, probe for next empty slot

Probing methods:
- Linear Probing: Check next slot sequentially. Can cause clustering.
- Quadratic Probing: Check slots at quadratic intervals. Reduces clustering.
- Double Hashing: Use second hash function for probe sequence. Best distribution.

Chaining vs Open Addressing:
- Chaining handles high load factors better
- Open addressing has better cache performance
- Open addressing uses less memory (no pointers)

Common applications:
- Dictionaries/objects in programming languages
- Database indexing
- Caching (LRU cache)
- Counting frequencies
- Detecting duplicates`,
          },
        ],
      },
    ],
  },
];

export function getTopicById(topicId: string): Topic | undefined {
  return studyTopics.find((t) => t.id === topicId);
}

export function getSubTopicById(
  topicId: string,
  subtopicId: string
): { topic: Topic; subtopic: typeof studyTopics[0]['subtopics'][0] } | undefined {
  const topic = getTopicById(topicId);
  if (!topic) return undefined;

  const subtopic = topic.subtopics.find((s) => s.id === subtopicId);
  if (!subtopic) return undefined;

  return { topic, subtopic };
}
