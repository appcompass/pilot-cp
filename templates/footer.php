				</main><!-- main -->
				<footer class="footer">
					<div class="footer-company">
						<p>Built with <span class="icon-heart"></span> by <a href="">Plus Three Interactive</a>.<br>
						&copy; <a href="">Plus Three Interactive, LLC</a>. All Rights Reserved.</p>
						<p class="footer-icons"><a href="" class="link-icon"><span class="icon-github"></span></a></p>
					</div>
					<div class="footer-reports">
<pre>[
  {
    "endpoint": "/api/users",
    "status": 200,
    "headers": {
      "date": "Wed, 22 Mar 2017 16:26:02 GMT",
      "content-encoding": "gzip",
      "vary": "Accept-Encoding",
      "server": "nginx/1.10.3",
      "x-powered-by": "Plus 3 Interactive LLC",
      "x-ratelimit-remaining": "59",
      "content-type": "application/json",
      "cache-control": "no-cache, private",
      "transfer-encoding": "chunked",
      "x-ratelimit-limit": "60",
      "connection": "close"
    },
    "debug": {
      "api_queries": [
        {
          "query": "select * from \"users\" where \"users\".\"id\" = ? limit 1",
          "bindings": [
            2
          ],
          "time": 1.05
        },
        {
          "query": "select * from \"forms\" where exists (select * from \"resources\" where \"forms\".\"id\" = \"resources\".\"form_id\" and \"resource\" = ?) limit 1",
          "bindings": [
            "users.index"
          ],
          "time": 1.01
        },
        {
          "query": "select * from \"fields\" where \"fields\".\"form_id\" in (?) order by \"id\" asc",
          "bindings": [
            6
          ],
          "time": 0.68
        },
        {
          "query": "select * from \"field_sources\" where \"field_sources\".\"linked_id\" in (?, ?, ?, ?, ?, ?, ?) and \"field_sources\".\"linked_type\" = ?",
          "bindings": [
            35,
            36,
            37,
            38,
            39,
            40,
            41,
            "P3in\\Models\\Field"
          ],
          "time": 0.52
        },
        {
          "query": "select * from \"roles\" where \"name\" = ? limit 1",
          "bindings": [
            "admin"
          ],
          "time": 0.46
        },
        {
          "query": "select \"users\".*, \"role_user\".\"role_id\" as \"pivot_role_id\", \"role_user\".\"user_id\" as \"pivot_user_id\", \"role_user\".\"created_at\" as \"pivot_created_at\", \"role_user\".\"updated_at\" as \"pivot_updated_at\" from \"users\" inner join \"role_user\" on \"users\".\"id\" = \"role_user\".\"user_id\" where \"role_user\".\"role_id\" = ?",
          "bindings": [
            2
          ],
          "time": 0.75
        },
        {
          "query": "select * from \"roles\" where \"name\" = ? limit 1",
          "bindings": [
            "admin"
          ],
          "time": 0.32
        },
        {
          "query": "select \"users\".*, \"role_user\".\"role_id\" as \"pivot_role_id\", \"role_user\".\"user_id\" as \"pivot_user_id\", \"role_user\".\"created_at\" as \"pivot_created_at\", \"role_user\".\"updated_at\" as \"pivot_updated_at\" from \"users\" inner join \"role_user\" on \"users\".\"id\" = \"role_user\".\"user_id\" where \"role_user\".\"role_id\" = ?",
          "bindings": [
            2
          ],
          "time": 0.49
        },
        {
          "query": "select count(*) as aggregate from \"users\"",
          "bindings": [],
          "time": 0.37
        },
        {
          "query": "select * from \"users\" limit 25 offset 0",
          "bindings": [],
          "time": 0.28
        },
        {
          "query": "select * from \"roles\" where \"name\" = ? limit 1",
          "bindings": [
            "admin"
          ],
          "time": 0.29
        },
        {
          "query": "select \"users\".*, \"role_user\".\"role_id\" as \"pivot_role_id\", \"role_user\".\"user_id\" as \"pivot_user_id\", \"role_user\".\"created_at\" as \"pivot_created_at\", \"role_user\".\"updated_at\" as \"pivot_updated_at\" from \"users\" inner join \"role_user\" on \"users\".\"id\" = \"role_user\".\"user_id\" where \"role_user\".\"role_id\" = ?",
          "bindings": [
            2
          ],
          "time": 0.46
        },
        {
          "query": "select * from \"resources\" where (\"req_role\" is null or exists (select * from \"roles\" where \"resources\".\"req_role\" = \"roles\".\"id\" and exists (select * from \"users\" inner join \"role_user\" on \"users\".\"id\" = \"role_user\".\"user_id\" where \"roles\".\"id\" = \"role_user\".\"role_id\" and \"id\" = ?))) and \"resource\" = ? limit 1",
          "bindings": [
            2,
            "users.index"
          ],
          "time": 0.85
        },
        {
          "query": "select * from \"forms\" where \"forms\".\"id\" in (?)",
          "bindings": [
            6
          ],
          "time": 0.29
        },
        {
          "query": "select * from \"fields\" where \"fields\".\"form_id\" in (?) order by \"id\" asc",
          "bindings": [
            6
          ],
          "time": 0.32
        },
        {
          "query": "select * from \"field_sources\" where \"field_sources\".\"linked_id\" in (?, ?, ?, ?, ?, ?, ?) and \"field_sources\".\"linked_type\" = ?",
          "bindings": [
            35,
            36,
            37,
            38,
            39,
            40,
            41,
            "P3in\\Models\\Field"
          ],
          "time": 0.29
        }
      ],
      "oracle_queries": [],
      "oracle_calls": null
    }
  }
]</pre>
					</div><!-- footer-reports -->
				</footer><!-- footer -->
			</div><!-- main-container-->
		</div><!-- content-container -->
	</div><!-- site-container -->
	
	<script src="assets/bower_components/jquery/dist/jquery.min.js"></script>
	<script src="assets/js/dist/main-min.js"></script>
</body>
</html>