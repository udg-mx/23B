<?php

class api
{
    protected ?PDO $db = null;

    /**
     * Constructor
     */
    public function __construct()
    {
        // init session
        session_start();

        // cargar variables de entorno
        $this->loadDotEnv();
    }

    /**
     * Inicializa la aplicación
     * @return void
     */
    public function init(): void
    {


        // obtener respuesta
        $response = $this->route();

        // codigo de respuesta
        if ($response['error'] ?? false) http_response_code(400);
        else if ($response['data'] ?? false) http_response_code(200);
        else if (!$response) http_response_code(404);
        else http_response_code(204);


        // header del content type
        header('Content-Type: application/json');

        // convertir a json e imprimir
        echo json_encode($response, !$this->isProduction() ? (JSON_THROW_ON_ERROR | JSON_PRETTY_PRINT) : 0);
        exit;
    }

    /**
     * GET /books - Devuelve un listado de libros
     * @return array
     */
    public function get(): array
    {
        // preparar respuesta
        $results = [];

        // valores validos
        $valid_limits = [5, 10, 20, 50];
        $valid_sort = ['id', 'author', 'title'];
        $valid_order = ['asc', 'desc'];

        // obtener el limite del query
        $limit = (int) ($_GET['limit'] ?? 10);
        $limit = in_array($limit, $valid_limits) ? $limit : 10;

        // paginado y offset
        $page = $_GET['page'] ?? 1;
        $offset = ($page - 1) * $limit;

        // obtener el query
        $query = $_GET['query'] ?? '';

        // obtener el orden
        $sort = $_GET['sort'] ?? 'id';
        $sort = in_array($sort, $valid_sort) ? $sort : 'id';

        // obtener la ordenacion
        $order = strtolower($_GET['order'] ?? 'asc');
        $order = in_array($order, $valid_order) ? $order : 'asc';



        // obtener total de libros
        $sql = "SELECT COUNT(*) AS total FROM books WHERE (CAST(id AS TEXT) ILIKE :query1 OR title ILIKE :query2 OR author ILIKE :query3)";
        $stmt = $this->db()->prepare($sql);


        // enlazar parametros
        $stmt->bindValue(':query1', '%' . $query . '%');
        $stmt->bindValue(':query2', '%' . $query . '%');
        $stmt->bindValue(':query3', '%' . $query . '%');
        $stmt->execute();

        // guardar total de libros
        $results['total'] = $stmt->fetchColumn();

        // guardar paginas
        $results['pages'] = ceil($results['total'] / $limit);


        // preparar query
        $sql = "SELECT * FROM books WHERE (CAST(id AS TEXT) ILIKE :query1 OR title ILIKE :query2 OR author ILIKE :query3) ORDER BY $sort $order LIMIT :limit OFFSET :offset ";
        $stmt = $this->db()->prepare($sql);

        // enlazar parametros
        $stmt->bindValue(':query1', '%' . $query . '%');
        $stmt->bindValue(':query2', '%' . $query . '%');
        $stmt->bindValue(':query3', '%' . $query . '%');
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        $data = $stmt->fetchAll();

        // guardar libros
        $results['data'] = is_array($data) ? $data : [];

        return $results;

    }

    /**
     * Identifica la ruta y llama al método correspondiente
     * @return array|string[]
     */
    public function route(): array
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET')
        {
            return $this->get();
        }

        return ['error' => 'Method not allowed'];

    }

    /**
     * Devuelve una instancia de PDO
     * @return PDO
     */
    protected function db(): PDO
    {
        // si no hay conexion, crearla
        if ($this->db === null)
        {

            // generar DSN
            $dsn = sprintf('pgsql:host=%s;dbname=%s;options=\'--client_encoding=UTF8\'', $_ENV['DB_HOST'], $_ENV['DB_NAME']);
            // crear conexion
            $this->db = new PDO($dsn, $_ENV['DB_USER'], $_ENV['DB_PASS']);

            // configurar PDO
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

        }

        // devolver conexion
        return $this->db;
    }

    // Cargar variables de entorno
    protected function loadDotEnv(): void
    {
        // Ruta del archivo
        $filePath = __DIR__ . DIRECTORY_SEPARATOR . '.env';

        // Si no existe el archivo, no hacer nada
        if (!file_exists($filePath)) return;

        // Lee las líneas del archivo
        $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        // Si no hay líneas, no hacer nada
        if ($lines === false) return;

        // Recorrer las líneas
        foreach ($lines as $line) {

            // Si la línea es un comentario, no hacer nada
            if (str_starts_with(trim($line), '#')) continue;

            // Separar la clave y el valor
            list($name, $value) = explode('=', $line, 2);

            // Asignar la variable de entorno
            $_ENV[strtoupper(trim($name))] = trim($value);
        }
    }

    // Devuelve true si la aplicación está en producción
    protected function isProduction(): bool
    {
        return $_ENV['APP_ENV'] === 'production';
    }

}
(new api)->init();