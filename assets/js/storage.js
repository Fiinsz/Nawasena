/* ====================================================
   STORAGE.JS - LocalStorage CRUD Operations
   KKM NAWASENA - Kelompok 97
   ==================================================== */

// Storage Object
const Storage = {
    // ===== ARTIKEL CRUD =====
    
    // Get All Artikel
    getArtikel: function() {
        const artikel = localStorage.getItem('kkm_artikel');
        return artikel ? JSON.parse(artikel) : [];
    },
    
    // Get Single Artikel by ID
    getArtikelById: function(id) {
        const artikel = this.getArtikel();
        return artikel.find(a => a.id === id);
    },
    
    // Create Artikel
    createArtikel: function(data) {
        const artikel = this.getArtikel();
        const newArtikel = {
            id: generateId(),
            title: data.title,
            excerpt: data.excerpt,
            content: data.content,
            kategori: data.kategori,
            author: data.author,
            image: data.image || 'https://via.placeholder.com/800x400?text=Artikel',
            date: new Date().toISOString().split('T')[0],
            views: 0,
            createdAt: new Date().toISOString()
        };
        artikel.unshift(newArtikel);
        localStorage.setItem('kkm_artikel', JSON.stringify(artikel));
        return newArtikel;
    },
    
    // Update Artikel
    updateArtikel: function(id, data) {
        const artikel = this.getArtikel();
        const index = artikel.findIndex(a => a.id === id);
        
        if (index !== -1) {
            artikel[index] = {
                ...artikel[index],
                ...data,
                updatedAt: new Date().toISOString()
            };
            localStorage.setItem('kkm_artikel', JSON.stringify(artikel));
            return artikel[index];
        }
        return null;
    },
    
    // Delete Artikel
    deleteArtikel: function(id) {
        const artikel = this.getArtikel();
        const filtered = artikel.filter(a => a.id !== id);
        localStorage.setItem('kkm_artikel', JSON.stringify(filtered));
        return true;
    },
    
    // Increment Artikel Views
    incrementArtikelViews: function(id) {
        const artikel = this.getArtikel();
        const index = artikel.findIndex(a => a.id === id);
        
        if (index !== -1) {
            artikel[index].views = (artikel[index].views || 0) + 1;
            localStorage.setItem('kkm_artikel', JSON.stringify(artikel));
        }
    },
    
    // Get Artikel by Category
    getArtikelByCategory: function(kategori) {
        const artikel = this.getArtikel();
        return kategori === 'Semua' ? artikel : artikel.filter(a => a.kategori === kategori);
    },
    
    // Search Artikel
    searchArtikel: function(query) {
        const artikel = this.getArtikel();
        const lowerQuery = query.toLowerCase();
        return artikel.filter(a => 
            a.title.toLowerCase().includes(lowerQuery) ||
            a.excerpt.toLowerCase().includes(lowerQuery) ||
            a.content.toLowerCase().includes(lowerQuery)
        );
    },
    
    // ===== POST CRUD =====
    
    // Get All Posts
    getPosts: function() {
        const posts = localStorage.getItem('kkm_posts');
        return posts ? JSON.parse(posts) : [];
    },
    
    // Get Single Post by ID
    getPostById: function(id) {
        const posts = this.getPosts();
        return posts.find(p => p.id === id);
    },
    
    // Create Post
    createPost: function(data) {
        const posts = this.getPosts();
        const newPost = {
            id: generateId(),
            caption: data.caption,
            image: data.image || 'https://via.placeholder.com/600x600?text=Post',
            author: data.author,
            date: new Date().toISOString().split('T')[0],
            likes: 0,
            createdAt: new Date().toISOString()
        };
        posts.unshift(newPost);
        localStorage.setItem('kkm_posts', JSON.stringify(posts));
        return newPost;
    },
    
    // Update Post
    updatePost: function(id, data) {
        const posts = this.getPosts();
        const index = posts.findIndex(p => p.id === id);
        
        if (index !== -1) {
            posts[index] = {
                ...posts[index],
                ...data,
                updatedAt: new Date().toISOString()
            };
            localStorage.setItem('kkm_posts', JSON.stringify(posts));
            return posts[index];
        }
        return null;
    },
    
    // Delete Post
    deletePost: function(id) {
        const posts = this.getPosts();
        const filtered = posts.filter(p => p.id !== id);
        localStorage.setItem('kkm_posts', JSON.stringify(filtered));
        return true;
    },
    
    // Toggle Like Post
    toggleLikePost: function(id) {
        const posts = this.getPosts();
        const index = posts.findIndex(p => p.id === id);
        
        if (index !== -1) {
            posts[index].likes = (posts[index].likes || 0) + 1;
            localStorage.setItem('kkm_posts', JSON.stringify(posts));
            return posts[index].likes;
        }
        return 0;
    },
    
    // ===== INITIALIZE DUMMY DATA =====
    
    initializeDummyData: function() {
        // Check if data already exists
        if (this.getArtikel().length === 0) {
            // Create dummy artikel
            const dummyArtikel = [
                {
                    id: generateId(),
                    title: "Pembukaan KKM NAWASENA Kelompok 97 di Desa Dengkol",
                    excerpt: "Acara pembukaan KKM NAWASENA Kelompok 97 dilaksanakan dengan meriah di Balai Desa Dengkol, Singosari.",
                    content: `<p>Pada tanggal 5 Januari 2026, KKM NAWASENA Kelompok 97 resmi dibuka di Balai Desa Dengkol, Dusun Sumbersari, Singosari, Malang. Acara pembukaan dihadiri oleh Kepala Desa, Dosen Pembimbing Lapangan (DPL) Muhammad Muhsin Arumawan, M.Pd.I, serta seluruh anggota kelompok yang berjumlah 14 mahasiswa.</p>
                    
                    <h3>Sambutan Kepala Desa</h3>
                    <p>Kepala Desa Dengkol menyambut hangat kedatangan mahasiswa KKM dan berharap kegiatan ini dapat memberikan manfaat nyata bagi masyarakat. Beliau juga menekankan pentingnya kolaborasi antara mahasiswa, pemerintah desa, dan masyarakat dalam mencapai tujuan pemberdayaan.</p>
                    
                    <h3>Program yang Akan Dilaksanakan</h3>
                    <p>Dalam sambutannya, koordinator tim memaparkan berbagai program yang akan dilaksanakan, meliputi bidang pendidikan, ekonomi kreatif, infrastruktur, dan pengembangan teknologi informasi untuk kemajuan desa.</p>
                    
                    <p>Acara ditutup dengan doa bersama dan foto bersama seluruh peserta, menandai dimulainya pengabdian KKM NAWASENA Kelompok 97.</p>`,
                    kategori: "Berita",
                    author: "Kartika",
                    image: "https://via.placeholder.com/800x400?text=Pembukaan+KKM",
                    date: "2026-01-05",
                    views: 0,
                    createdAt: new Date().toISOString()
                },
                {
                    id: generateId(),
                    title: "Pelatihan Teknologi Informasi untuk UMKM Desa Dengkol",
                    excerpt: "Tim Teknologi memberikan pelatihan digital marketing dan e-commerce untuk pelaku UMKM lokal.",
                    content: `<p>Tim Teknologi KKM NAWASENA menyelenggarakan pelatihan teknologi informasi bagi pelaku UMKM di Desa Dengkol. Pelatihan ini bertujuan untuk meningkatkan kemampuan digital marketing dan pemanfaatan platform e-commerce.</p>
                    
                    <h3>Materi Pelatihan</h3>
                    <p>Materi yang diberikan meliputi penggunaan media sosial untuk promosi, fotografi produk, pengelolaan marketplace, dan dasar-dasar desain grafis untuk konten promosi.</p>
                    
                    <p>Antusiasme peserta sangat tinggi dan mereka berkomitmen untuk menerapkan ilmu yang didapat dalam mengembangkan usaha mereka.</p>`,
                    kategori: "Program",
                    author: "Muhammad Arifin",
                    image: "https://via.placeholder.com/800x400?text=Pelatihan+IT",
                    date: "2026-01-10",
                    views: 0,
                    createdAt: new Date().toISOString()
                },
                {
                    id: generateId(),
                    title: "Gotong Royong Membersihkan Lingkungan Desa",
                    excerpt: "Seluruh anggota KKM bersama masyarakat melakukan gotong royong bersih-bersih lingkungan desa.",
                    content: `<p>Dalam rangka mewujudkan lingkungan desa yang bersih dan sehat, anggota KKM NAWASENA Kelompok 97 bersama warga melakukan kegiatan gotong royong membersihkan lingkungan desa.</p>
                    
                    <h3>Lokasi Kegiatan</h3>
                    <p>Kegiatan dilaksanakan di beberapa titik strategis seperti balai desa, jalan utama, dan area publik lainnya. Antusiasme warga sangat tinggi dengan partisipasi lebih dari 50 orang.</p>
                    
                    <p>Kegiatan ini juga sekaligus mempererat hubungan antara mahasiswa KKM dengan masyarakat Desa Dengkol.</p>`,
                    kategori: "Kegiatan",
                    author: "Dina",
                    image: "https://via.placeholder.com/800x400?text=Gotong+Royong",
                    date: "2026-01-12",
                    views: 0,
                    createdAt: new Date().toISOString()
                }
            ];
            
            localStorage.setItem('kkm_artikel', JSON.stringify(dummyArtikel));
        }
        
        if (this.getPosts().length === 0) {
            // Create dummy posts
            const dummyPosts = [
                {
                    id: generateId(),
                    caption: "Hari pertama KKM NAWASENA! Semangat mengabdi untuk masyarakat Desa Dengkol 💪 #KKMNAWASENA #Kelompok97",
                    image: "https://via.placeholder.com/600x600?text=First+Day",
                    author: "Kartika",
                    date: "2026-01-05",
                    likes: 0,
                    createdAt: new Date().toISOString()
                },
                {
                    id: generateId(),
                    caption: "Pelatihan digital marketing untuk UMKM lokal. Semoga bermanfaat! 📱💻 #PemberdayaanUMKM",
                    image: "https://via.placeholder.com/600x600?text=Digital+Training",
                    author: "Muhammad Arifin",
                    date: "2026-01-10",
                    likes: 0,
                    createdAt: new Date().toISOString()
                },
                {
                    id: generateId(),
                    caption: "Gotong royong bareng warga Desa Dengkol. Bersih-bersih untuk lingkungan yang lebih sehat! 🧹🌿",
                    image: "https://via.placeholder.com/600x600?text=Gotong+Royong",
                    author: "Royyan",
                    date: "2026-01-12",
                    likes: 0,
                    createdAt: new Date().toISOString()
                }
            ];
            
            localStorage.setItem('kkm_posts', JSON.stringify(dummyPosts));
        }
    }
};

// Helper function to generate ID (same as in main.js)
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Initialize dummy data on first load
Storage.initializeDummyData();

// Export Storage object
window.Storage = Storage;
