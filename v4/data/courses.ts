import { Course } from '../types/course';

export const courses: Course[] = [
  {
    id: 'algorithms',
    title: 'Algorithms & Data Structures',
    category: 'Computer Science',
    icon: 'code-slash',
    color: '#F97316',
    sections: [
      {
        id: 'big-o',
        title: 'Big O Notation',
        pages: [
          {
            id: 'big-o-1',
            title: 'What is Big O?',
            content: `Big O notation is a mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity.

In computer science, we use Big O to classify algorithms according to how their run time or space requirements grow as the input size grows.

Why does this matter? Because as your data grows from 100 items to 100 million items, the difference between O(n) and O(n²) becomes the difference between 1 second and 11 days of processing time.`,
          },
          {
            id: 'big-o-2',
            title: 'Common Time Complexities',
            content: `Here are the most common time complexities you'll encounter:

O(1) - Constant Time
The algorithm takes the same time regardless of input size. Example: accessing an array element by index.

O(log n) - Logarithmic Time
The algorithm's time increases logarithmically. Example: binary search.

O(n) - Linear Time
Time grows proportionally with input. Example: iterating through an array once.

O(n log n) - Linearithmic Time
Common in efficient sorting algorithms. Example: merge sort, quicksort.

O(n²) - Quadratic Time
Time grows with the square of input. Example: nested loops over the same data.`,
          },
          {
            id: 'big-o-3',
            title: 'Analyzing Your Code',
            content: `To analyze Big O, follow these steps:

1. Count the operations
Look at loops, recursive calls, and function invocations. Each operation that depends on input size contributes to complexity.

2. Drop constants
O(2n) simplifies to O(n). Constants don't affect growth rate at scale.

3. Keep the dominant term
O(n² + n) simplifies to O(n²). The largest term dominates as n grows.

4. Consider worst case
Unless specified otherwise, Big O represents worst-case performance.

Practice tip: Start by identifying the innermost operations and work outward to determine how many times each executes.`,
          },
        ],
      },
      {
        id: 'arrays-lists',
        title: 'Arrays vs Linked Lists',
        pages: [
          {
            id: 'arrays-1',
            title: 'Understanding Arrays',
            content: `Arrays are the most fundamental data structure in programming. They store elements in contiguous memory locations.

Key characteristics:
• Fixed size (in most languages)
• Random access in O(1) time
• Cache-friendly due to memory locality
• Insertions/deletions are O(n) in the middle

Arrays excel when you need fast lookups by index and know the size upfront. They're the backbone of many other data structures.

Memory layout: [A][B][C][D][E]
Each element sits right next to the other in memory.`,
          },
          {
            id: 'arrays-2',
            title: 'Understanding Linked Lists',
            content: `Linked lists store elements in nodes scattered throughout memory. Each node contains data and a pointer to the next node.

Key characteristics:
• Dynamic size
• Sequential access only - O(n) to find element
• O(1) insertions/deletions (once you have the position)
• More memory overhead (storing pointers)

Types of linked lists:
• Singly linked: each node points to next
• Doubly linked: nodes point to both next and previous
• Circular: last node points back to first

Memory layout: [A]→[B]→[C]→[D]→null
Nodes can be anywhere in memory.`,
          },
          {
            id: 'arrays-3',
            title: 'When to Use Which',
            content: `Choosing between arrays and linked lists depends on your access patterns:

Use Arrays when:
• You need random access (arr[i])
• Size is known and fixed
• Memory efficiency matters
• You're iterating sequentially often

Use Linked Lists when:
• Size changes frequently
• Insertions/deletions at known positions are common
• You don't need random access
• Memory fragmentation is a concern

Real-world examples:
• Arrays: lookup tables, buffers, matrices
• Linked Lists: undo functionality, music playlists, memory allocators

Most modern applications favor arrays or dynamic arrays (like ArrayList, Vector) due to cache performance benefits.`,
          },
        ],
      },
    ],
  },
  {
    id: 'networks',
    title: 'Computer Networks',
    category: 'Computer Science',
    icon: 'globe',
    color: '#3B82F6',
    sections: [
      {
        id: 'internet-basics',
        title: 'How the Internet Works',
        pages: [
          {
            id: 'internet-1',
            title: 'The Network of Networks',
            content: `The Internet is not a single network—it's a network of networks. Millions of private, public, academic, and government networks are interconnected.

When you visit a website, your request travels through multiple networks:
1. Your home network (WiFi router)
2. Your ISP's network
3. Internet backbone networks
4. The destination's network

This works because all networks agree to use the same protocols—rules for communication. The most important is TCP/IP, the "language" of the Internet.

Fun fact: No single organization owns or controls the Internet. It works through cooperation and standardization.`,
          },
          {
            id: 'internet-2',
            title: 'IP Addresses and Routing',
            content: `Every device on the Internet needs an address to receive data. This is the IP address.

IPv4: 192.168.1.1 (32 bits, ~4 billion addresses)
IPv6: 2001:0db8:85a3::8a2e:0370:7334 (128 bits, virtually unlimited)

How does data find its way? Through routing.

Routers are devices that forward data packets toward their destination. Each router:
1. Receives a packet
2. Looks at the destination IP
3. Consults its routing table
4. Forwards to the next hop

This happens dozens of times for each request. Try running 'traceroute google.com' to see the path your data takes!`,
          },
          {
            id: 'internet-3',
            title: 'Packets and Protocols',
            content: `Data on the Internet travels in packets—small chunks of data with addressing information.

Why packets instead of continuous streams?
• Multiple conversations can share the same wires
• If one packet is lost, only that piece needs resending
• Networks can route around failures

Key protocols:

TCP (Transmission Control Protocol)
• Reliable, ordered delivery
• Used for web pages, email, files
• Slower but guaranteed

UDP (User Datagram Protocol)
• Fast, no guarantees
• Used for video streaming, gaming
• Some loss is acceptable

HTTP/HTTPS runs on top of TCP to deliver web content. When you load a page, hundreds of TCP packets carry the HTML, CSS, JavaScript, and images.`,
          },
        ],
      },
      {
        id: 'dns',
        title: 'DNS Explained',
        pages: [
          {
            id: 'dns-1',
            title: 'The Internet\'s Phone Book',
            content: `DNS (Domain Name System) translates human-readable domain names into IP addresses.

When you type "google.com", your browser doesn't know where that is. It needs the IP address (like 142.250.80.46).

DNS is like a phone book:
• You know the name (google.com)
• DNS looks up the number (142.250.80.46)
• Now you can make the call (HTTP request)

Without DNS, you'd have to memorize IP addresses for every website. Imagine remembering 142.250.80.46 instead of google.com!

DNS is distributed—no single server has all the answers. This makes it fast and resilient.`,
          },
          {
            id: 'dns-2',
            title: 'The DNS Lookup Process',
            content: `When you request a website, here's what happens:

1. Browser Cache
First, check if you've looked this up recently.

2. Operating System Cache
Your computer might remember from earlier.

3. Recursive Resolver (usually your ISP)
If not cached, ask your ISP's DNS server.

4. Root Name Server
The resolver asks a root server: "Who handles .com?"

5. TLD Name Server
The .com server says: "google.com is handled by ns1.google.com"

6. Authoritative Name Server
Finally, Google's server responds with the IP address.

This seems slow, but aggressive caching means most lookups are answered locally in milliseconds.`,
          },
          {
            id: 'dns-3',
            title: 'DNS Records',
            content: `DNS doesn't just store IP addresses. Different record types serve different purposes:

A Record
Maps domain to IPv4 address
google.com → 142.250.80.46

AAAA Record
Maps domain to IPv6 address
google.com → 2607:f8b0:4004:800::200e

CNAME Record
Alias from one name to another
www.example.com → example.com

MX Record
Mail server for the domain
example.com mail → mail.example.com

TXT Record
Arbitrary text, often for verification
Used for email security (SPF, DKIM)

You can query these yourself using 'nslookup' or 'dig' commands in your terminal!`,
          },
        ],
      },
    ],
  },
];

export function getCourseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getSectionById(
  courseId: string,
  sectionId: string
): { course: Course; section: Course['sections'][0] } | undefined {
  const course = getCourseById(courseId);
  if (!course) return undefined;

  const section = course.sections.find((s) => s.id === sectionId);
  if (!section) return undefined;

  return { course, section };
}
