import re

def resolve_admin_page():
    path = "src/app/admin/bespoke/page.tsx"
    with open(path, "r") as f:
        content = f.read()

    # Conflict 1
    content = re.sub(
        r'<<<<<<< HEAD\n\s*category\?: string;\n=======\n\s*type\?: string;\n>>>>>>> [a-f0-9]+',
        '    category?: string;\n    type?: string;',
        content
    )

    # Conflict 2
    content = re.sub(
        r'<<<<<<< HEAD\n\s*const \[category, setCategory\] = useState\(\'Ring\'\);\n=======\n\s*const \[type, setType\] = useState\(\'commission\'\);\n>>>>>>> [a-f0-9]+',
        "    const [category, setCategory] = useState('Ring');\n    const [type, setType] = useState('commission');",
        content
    )

    # Conflict 3
    content = re.sub(
        r'<<<<<<< HEAD\n\s*setCategory\(work\.category \|\| \'Ring\'\);\n=======\n\s*setType\(work\.type \|\| \'commission\'\);\n>>>>>>> [a-f0-9]+',
        "            setCategory(work.category || 'Ring');\n            setType(work.type || 'commission');",
        content
    )

    # Conflict 4
    content = re.sub(
        r'<<<<<<< HEAD\n\s*setCategory\(work\.category \|\| \'Ring\'\);\n=======\n\s*setType\(\'ai_concept\'\);\n>>>>>>> [a-f0-9]+',
        "            setCategory(work.category || 'Ring');\n            setType('ai_concept');",
        content
    )

    # Conflict 5
    content = re.sub(
        r'<<<<<<< HEAD\n\s*setCategory\(\'Ring\'\);\n=======\n\s*setType\(\'commission\'\);\n>>>>>>> [a-f0-9]+',
        "            setCategory('Ring');\n            setType('commission');",
        content
    )

    # Conflict 6
    content = re.sub(
        r'<<<<<<< HEAD\n\s*const payload = \{ name, image, tall, order: Number\(order\), isActive, category \};\n=======\n\s*const payload = \{ name, image, tall, order: Number\(order\), isActive, type \};\n>>>>>>> [a-f0-9]+',
        "        const payload = { name, image, tall, order: Number(order), isActive, category, type };",
        content
    )

    # Conflict 7
    content = re.sub(
        r'<<<<<<< HEAD\n\s*<th>Category<\/th>\n=======\n\s*<th>Type<\/th>\n>>>>>>> [a-f0-9]+',
        "                                <th>Category</th>\n                                <th>Type</th>",
        content
    )

    # Conflict 8
    content = re.sub(
        r'<<<<<<< HEAD\n\s*<td>\{w\.category \|\| \'None\'\}<\/td>\n=======\n\s*<td>\n\s*<span style=\{\{ fontSize: \'11px\', textTransform: \'uppercase\', letterSpacing: \'0\.05em\', color: \'var\(--stone\)\', background: \'var\(--cream\)\', padding: \'2px 6px\', borderRadius: \'4px\' \}\}>\n\s*\{w\.type === \'ai_concept\' \? \'AI Concept\' : \'Commission\'\}\n\s*<\/span>\n\s*<\/td>\n>>>>>>> [a-f0-9]+',
        """                                    <td>{w.category || 'None'}</td>
                                    <td>
                                        <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--stone)', background: 'var(--cream)', padding: '2px 6px', borderRadius: '4px' }}>
                                            {w.type === 'ai_concept' ? 'AI Concept' : 'Commission'}
                                        </span>
                                    </td>""",
        content
    )

    with open(path, "w") as f:
        f.write(content)

def resolve_gallery():
    path = "src/app/bespoke/ClientBespokeGallery.tsx"
    with open(path, "r") as f:
        content = f.read()

    # Conflict in ClientBespokeGallery.tsx
    resolved_str = """    const typeFiltered = filter === 'all' ? works : works.filter(w => (w.type || 'commission') === filter);
    const filteredWorks = catFilter === 'all'
        ? typeFiltered
        : typeFiltered.filter(w => (w.category || '').toLowerCase() === catFilter.toLowerCase());

    const availableCategories = Array.from(new Set(typeFiltered.map(w => w.category).filter(Boolean)));"""

    content = re.sub(r'<<<<<<< HEAD.*?>>>>>>> [a-f0-9]+', resolved_str, content, flags=re.DOTALL)

    with open(path, "w") as f:
        f.write(content)

resolve_admin_page()
resolve_gallery()
